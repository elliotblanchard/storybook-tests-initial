import React, { useRef, useCallback, useState, createContext, useContext } from 'react';
import _reduce from 'lodash/reduce';
import _isEmpty from 'lodash/isEmpty';
import _omitBy from 'lodash/omitBy';
import Immutable from 'seamless-immutable';

/**
 * getErrors runs all the validations set for a given field against the field's value. If one or
 * more of the validations fail it will return an array of the messages associated with those
 * validations. Each validation is expected in this format:
 * [<validation function>, <failure message>]
 * The validations argument is an array of these arrays. There is also a set of pre-defined
 * validations available in another module, but this form module is completely unaware of them
 * and receives them in the same way it would a custom validation.
 *
 * The validation function receives the value and form values as arguments and is expected to
 * return an array with the first index being the field value giving it an opportunity to update
 * the value, and the second index being whether validation succeeded or failed.
 *
 * @param {Any} value is the value of the individual field input
 * @param {Object} values is an object containing all values from the form
 * @param {Array} validations contains all the validations and related messages for this field
 */
function getErrors(value, values, validations) {
  return _reduce(
    validations,
    (result, validation) => {
      const [previousValue, previousValidationErrors] = result;
      const [validateFunction, message] = validation;
      const [newValue, passedValidation] = validateFunction(previousValue, values);
      let nextValidationErrors = previousValidationErrors;
      if (!passedValidation) {
        nextValidationErrors = (previousValidationErrors || []).concat(message);
      }
      return [newValue, nextValidationErrors];
    },
    [value, undefined],
  );
}

/**
 * useField takes a react component and a field name and attaches the form's internal onChange
 * handler to them. When the wrapped field changes it updates the form which in turn pushes
 * the changes to its parent.
 *
 * Components passed in to this wrapper are expected to have at minimum these props:
 * value: The bare value which the component expects to display.
 * errors: An array of errors the field might have, the field is responsible for displaying them.
 * onChange: Which is called by the input when it changes and must match the format of the value.
 *
 * There are some optional props as well:
 * name: The field name of the component which can be used to generate ids in tests or for accessibility
 * values: The values of the other fields in the form.
 * onFocus: This is used to hold back showing errors until a user has filled out a field. This avoids
 * janky behavior of fields that distract the user with errors as the user types.
 * onBlur: This removes the restriction on showing errors. If an error persists until after a user has
 * moved to another field then it's safe to alert the user of that error.
 *
 * @param {React Component} Component is the wrapped form field provided
 * @param {String} fieldName is the key to be used for the field data
 * @param {Array} validations is an array of arrays containing the validations for the field
 * @param {Function} formOnChange is the form's internal onChange method to update a single field
 * @param {React Context} Context is used to get data from the parent Form
 */
function useField(Component, fieldName, validations, Context) {
  return props => {
    const [showErrors, setShowErrors] = useState(true);
    const { values, errors, formOnChange } = useContext(Context);
    const onChange = useCallback(
      value => {
        const [newValue, validationErrors] = getErrors(value, values, validations);
        formOnChange(fieldName, newValue, validationErrors);
      },
      [values],
    );
    const onFocus = useCallback(() => {
      if (!errors[fieldName]) setShowErrors(false);
    }, [errors]);
    const onBlur = useCallback(() => {
      setShowErrors(true);
    }, []);
    return (
      <Component
        {...props}
        value={values[fieldName]}
        errors={showErrors && errors[fieldName]}
        onChange={onChange}
        name={fieldName}
        values={values}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  };
}

/**
 * memoizedUseField caches form fields that have been bound to the form so they're not regenerated on
 * every render. It relies on the Component object itself, the fieldName and the form's ref as keys for
 * the cache.
 *
 * @param {Function} onChange is the form's internal onChange method to update a single field
 * @param {Function} fieldWrapper is the function wrapping the input component and binding it to the form
 * @param {Object} ref is used as a memoization key and to access Context being sent to the field
 */
export function memoizedUseField(fieldWrapper, ref) {
  const cache = {};
  return (Component, fieldName, validations) => {
    if (cache[fieldName]?.Component === Component && cache[fieldName]?.ref === ref) {
      return cache[fieldName].Instance;
    }
    cache[fieldName] = {
      Instance: fieldWrapper(Component, fieldName, validations, ref.current.Context),
      Component,
      ref,
    };
    return cache[fieldName].Instance;
  };
}

/**
 * useForm is a react hook which receives a form state object and a callback function to update that state.
 * It returns a context provider and a wrapper function to attach field components to the form. When those
 * fields call their onChange method the form will call the parent's onChange method with the updated form state.
 * It's important to note that this form has a completely controlled state, as in, it doesn't manage it. It expects
 * the state updates it makes to its parent to be returned on the next render and managed elsewhere.
 *
 * @param {Object} values The form values coming from outside the form
 * @param {Function} parentOnChange The onChange callback to push new form changes to the parent
 */
function useForm(values, parentOnChange) {
  const [init, setInit] = useState(true);
  const [errors, setErrors] = useState(Immutable({}));

  const formOnChange = useCallback(
    (field, newValue, newErrors) => {
      let updatedErrors = Immutable.setIn(errors, [field], newErrors);
      updatedErrors = _omitBy(updatedErrors, value => !value);
      let updatedValues = Immutable.setIn(values, [field], newValue);
      updatedValues = Immutable.setIn(updatedValues, ['_hasErrors'], !_isEmpty(updatedErrors));
      setErrors(updatedErrors);
      parentOnChange(updatedValues);
    },
    [errors, values],
  );

  const ref = useRef({});
  if (init) {
    ref.current.Context = createContext({ values, errors });
    ref.current.useField = memoizedUseField(useField, ref);
    setInit(false);
  }
  return [ref.current.Context.Provider, ref.current.useField, { values, errors, formOnChange }];
}

export default useForm;