import React from 'react';
import _map from 'lodash/map';
import { render, fireEvent, cleanup } from '@testing-library/react';

import useForm from '.';
import { min, max, email } from './validations';

const TextInputComponent = ({ name, value = '', errors, onChange, onBlur, onFocus }) => (
  <>
    <input
      data-testid={name}
      value={value}
      onChange={event => onChange(event.target.value)}
      onBlur={onBlur}
      onFocus={onFocus}
    />
    {_map(errors, (error, index) => (
      <div data-testid={`${name}-error-${index}`} key={error}>
        {error}
      </div>
    ))}
  </>
);

const minError = 'mock min message';
const maxError = 'mock max message';
const emailError = 'mock email message';
const customError = 'mock custom error';

const lastNameValidations = [min(2, minError), max(5, maxError)];
const emailValidations = [email(emailError), max(15, maxError)];
const passedDownValidations = [min(2, minError), max(15, maxError)];
const customValidations = [[(field, fields) => [field, field === fields.email], customError]];

const SubComponent = ({ Field, CustomError }) => (
  <div>
    <Field />
    <CustomError />
  </div>
);

const MockForm = ({ values, onChange, validate = false }) => {
  const [Form, useField, formValues] = useForm(values, onChange);
  const FirstName = useField(TextInputComponent, 'firstName');
  const LastName = useField(TextInputComponent, 'lastName', validate && lastNameValidations);
  const Email = useField(TextInputComponent, 'email', validate && emailValidations);
  const PassedDown = useField(TextInputComponent, 'passedDown', validate && passedDownValidations);
  const CustomError = useField(TextInputComponent, 'customError', validate && customValidations);
  return (
    <Form value={formValues}>
      <FirstName />
      <LastName />
      <Email />
      <SubComponent Field={PassedDown} CustomError={CustomError} />
    </Form>
  );
};

describe('useForm', () => {
  let renderWith;
  let setInputValue;
  let getInputValue;
  let getInput;
  let getError;
  let getErrorText;
  let onChange;
  let validate;

  beforeEach(() => {
    cleanup();
    let getByTestId;
    let queryByTestId;
    let rerender;
    validate = false;
    onChange = jest.fn(values => {
      rerender(<MockForm values={values} onChange={onChange} validate={validate} />);
    });
    renderWith = values => {
      ({ getByTestId, queryByTestId, rerender } = render(
        <MockForm values={values} onChange={onChange} validate={validate} />,
      ));
    };
    getInput = name => getByTestId(name);
    getInputValue = name => getByTestId(name).value;
    getError = (name, index) => queryByTestId(`${name}-error-${index}`);
    getErrorText = (name, index) => getError(name, index).textContent;
    setInputValue = (name, value) => fireEvent.change(getByTestId(name), { target: { value } });
  });

  it('will receive and update values', () => {
    renderWith({ firstName: 'mock first' });
    expect(getInputValue('firstName')).toEqual('mock first');
    expect(getInputValue('lastName')).toEqual('');

    setInputValue('lastName', 'mock last');
    expect(getInputValue('lastName')).toEqual('mock last');
    expect(onChange).toHaveBeenLastCalledWith({
      firstName: 'mock first',
      lastName: 'mock last',
      _hasErrors: false,
    });

    setInputValue('firstName', 'new mock first');
    expect(onChange).toHaveBeenLastCalledWith({
      firstName: 'new mock first',
      lastName: 'mock last',
      _hasErrors: false,
    });
  });

  it('will display validation errors', () => {
    validate = true;
    renderWith({});
    setInputValue('lastName', 'more than five');
    expect(getErrorText('lastName', 0)).toEqual(maxError);
    expect(getError('lastName', 1)).toBe(null);

    setInputValue('lastName', '1');
    setInputValue('email', 'not an email');
    expect(getErrorText('email', 0)).toEqual(emailError);
    expect(getErrorText('lastName', 0)).toEqual(minError);
    expect(getError('lastName', 1)).toBe(null);

    setInputValue('lastName', 'four');
    expect(getError('lastName', 0)).toBe(null);
    expect(getError('email', 1)).toBe(null);

    setInputValue('email', 'a long incorrect email');
    expect(getErrorText('email', 0)).toEqual(emailError);
    expect(getErrorText('email', 1)).toEqual(maxError);
    expect(getError('email', 2)).toBe(null);
  });

  it('will wait until a user leaves a field to show the errors', () => {
    validate = true;
    renderWith({});
    getInput('lastName').focus();
    setInputValue('lastName', 'more than five');
    setInputValue('lastName', 'way more than five');
    expect(getError('lastName', 0)).toBe(null);

    getInput('lastName').blur();
    expect(getErrorText('lastName', 0)).toEqual(maxError);
  });

  it("will show a new error if the field isn't focused and will keep it after focus", () => {
    validate = true;
    renderWith({});
    setInputValue('lastName', 'more than five');
    expect(getErrorText('lastName', 0)).toEqual(maxError);

    getInput('lastName').focus();
    expect(getErrorText('lastName', 0)).toEqual(maxError);
    setInputValue('lastName', 'way more than five');
    expect(getErrorText('lastName', 0)).toEqual(maxError);
  });

  it('will remove resolved pre-existing issues before blur', () => {
    validate = true;
    renderWith({});
    setInputValue('lastName', 'more than five');
    expect(getErrorText('lastName', 0)).toEqual(maxError);

    getInput('lastName').focus();
    expect(getErrorText('lastName', 0)).toEqual(maxError);

    setInputValue('lastName', 'way more than five');
    expect(getErrorText('lastName', 0)).toEqual(maxError);

    setInputValue('lastName', 'four');
    expect(getError('lastName', 0)).toBe(null);
  });

  it('will still work if fields are passed to another component', () => {
    validate = true;
    renderWith({ passedDown: 'mock passed down' });
    expect(getInputValue('passedDown')).toEqual('mock passed down');

    setInputValue('passedDown', 'new mock passed down');
    expect(getInputValue('passedDown')).toEqual('new mock passed down');
    expect(onChange).toHaveBeenLastCalledWith({
      passedDown: 'new mock passed down',
      _hasErrors: true,
    });

    setInputValue('passedDown', 'more than fifteen characters');
    expect(getErrorText('passedDown', 0)).toEqual(maxError);

    setInputValue('passedDown', 'a');
    expect(getErrorText('passedDown', 0)).toEqual(minError);
    expect(getError('passedDown', 1)).toBe(null);

    setInputValue('passedDown', 'four');
    expect(getError('passedDown', 0)).toBe(null);

    getInput('passedDown').focus();
    setInputValue('passedDown', 'b');
    expect(getError('passedDown', 0)).toBe(null);

    getInput('passedDown').blur();
    expect(getErrorText('passedDown', 0)).toEqual(minError);
  });

  it('will work with custom validations', () => {
    validate = true;
    renderWith({ customError: 'mock custom', email: 'my@email.com' });
    setInputValue('customError', 'new mock passed down');
    expect(getErrorText('customError', 0)).toEqual(customError);

    setInputValue('customError', 'my@email.com');
    expect(getError('customError', 0)).toBe(null);
  });
});
