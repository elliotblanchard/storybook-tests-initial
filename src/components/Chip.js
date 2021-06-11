import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@bevy/bevy-design-system';

export default function ChipItem({ color, label, variant }) {
    return (
        <Chip color={color} label={label} variant={variant} />
    );
  }

ChipItem.propTypes = {
    color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'default']),
    label: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['default', 'outlined']),
};