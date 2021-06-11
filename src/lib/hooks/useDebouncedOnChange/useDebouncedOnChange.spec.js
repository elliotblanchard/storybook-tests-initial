import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import useDebouncedOnChange from '.';

const MockComponent = ({ value, onChange }) => {
  const [debouncedValue, debouncedOnChange] = useDebouncedOnChange(value, onChange);
  return (
    <input
      data-testid='input'
      value={debouncedValue}
      onChange={event => debouncedOnChange(event.target.value)}
    />
  );
};

describe(`usePreviousValue`, () => {
  beforeEach(() => {
    cleanup();
  });
  it(`will receive and display values from props`, () => {
    const onChange = jest.fn();
    const { rerender, getByTestId } = render(
      <MockComponent value='mock value' onChange={onChange} />,
    );
    const input = getByTestId('input');
    rerender(<MockComponent value='new mock value' onChange={onChange} />);
    expect(input.value).toEqual('new mock value');
    expect(onChange).not.toHaveBeenCalled();
  });
  it(`will call onChange with new updates`, () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<MockComponent value='mock value' onChange={onChange} />);
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'new different value' } });
    expect(onChange).toHaveBeenCalledWith('new different value');
  });
  it(`will call debounce onChange with one leading update`, done => {
    const onChange = jest.fn();
    const { getByTestId } = render(<MockComponent value='mock value' onChange={onChange} />);
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'd' } });
    fireEvent.change(input, { target: { value: 'de' } });
    fireEvent.change(input, { target: { value: 'deb' } });
    fireEvent.change(input, { target: { value: 'debo' } });
    fireEvent.change(input, { target: { value: 'debou' } });
    fireEvent.change(input, { target: { value: 'deboun' } });
    fireEvent.change(input, { target: { value: 'debounc' } });
    fireEvent.change(input, { target: { value: 'debounce' } });
    fireEvent.change(input, { target: { value: 'debounced' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenNthCalledWith(1, 'd');
    setTimeout(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenNthCalledWith(2, 'debounced');
      expect(input.value).toEqual('debounced');
      done();
    }, 501);
  });
  it(`will call debounce onChange even if the callback changes part-way`, done => {
    const onChange = jest.fn();
    const onChange2 = jest.fn();
    const { getByTestId, rerender } = render(
      <MockComponent value='mock value' onChange={onChange} />,
    );
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'd' } });
    fireEvent.change(input, { target: { value: 'de' } });
    fireEvent.change(input, { target: { value: 'deb' } });
    fireEvent.change(input, { target: { value: 'debo' } });
    fireEvent.change(input, { target: { value: 'debou' } });
    fireEvent.change(input, { target: { value: 'deboun' } });
    rerender(<MockComponent value='mock value' onChange={onChange2} />);
    fireEvent.change(input, { target: { value: 'debounc' } });
    fireEvent.change(input, { target: { value: 'debounce' } });
    fireEvent.change(input, { target: { value: 'debounced' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenNthCalledWith(1, 'd');
    setTimeout(() => {
      expect(onChange2).toHaveBeenCalledTimes(1);
      expect(onChange2).toHaveBeenNthCalledWith(1, 'debounced');
      expect(input.value).toEqual('debounced');
      done();
    }, 501);
  });
});
