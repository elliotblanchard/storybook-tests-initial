import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@bevy/bevy-design-system';

export default function AvatarItem({ variant, src, alt }) {
    return (
        <Avatar variant={variant} src={src} alt={alt} />
    );
  }

Avatar.propTypes = {
    alt: PropTypes.string.isRequired,
    src: PropTypes.string,
    variant: PropTypes.oneOf(['circle', 'square']),
};