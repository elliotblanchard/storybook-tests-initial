import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@bevy/bevy-design-system';

export default function CheckboxItem({ label, value, onChange }) {
    return (
        <Checkbox label={label} value={value} onChange={event => onChange(event.target.checked)} /> 
    );
  }

CheckboxItem.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.bool,
    onChange: PropTypes.func,
};