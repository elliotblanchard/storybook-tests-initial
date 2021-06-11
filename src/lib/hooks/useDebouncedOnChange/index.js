/* eslint-disable react-hooks/exhaustive-deps */
import _debounce from 'lodash/debounce';
import _isEqual from 'lodash/isEqual';
import { useState, useCallback, useEffect } from 'react';

/**
 * useDebouncedOnChange will take a value and an onChange method within a component
 * and allow the controlled input to keep a local state and only call the onChange at
 * intervals. This is particularly useful in a big form where calling onChange will cause
 * recalculations and rerendering of the entire component. If you're typing in an input
 * within such a form, every key stroke causes a cascade of events. By using this hook your
 * input will wait until the user has typed a good number of keystrokes before sending an
 * update upstream.
 *
 * @param {Any} incomingValue is the value being received by the component
 * @param {Function} onChange is the onChange callback the component calls when there's a change
 */
const useDebouncedOnChange = (incomingValue, parentOnChange) => {
  const [value, setValue] = useState(incomingValue);
  const [debouncedOnChange] = useState(() =>
    _debounce((onChange, ...args) => onChange(...args), 500, {
      leading: true,
    }),
  );
  // If the `incomingValue` has changed we update the local representation with the new value.
  // This can happen if the upstream state is changed by a different component. We still need to
  // change the current value within the effect because the React dependency checks only the incoming
  // props and doesn't compare it to our internal value.
  useEffect(() => {
    if (!_isEqual(value, incomingValue)) setValue(incomingValue);
  }, [incomingValue]);
  const callback = useCallback(
    newValue => {
      debouncedOnChange(parentOnChange, newValue);
      setValue(newValue);
    },
    [parentOnChange],
  );
  return [value, callback];
};

export default useDebouncedOnChange;
