import React from 'react';
import AvatarItem from './Avatar';
import snapshot from '../../../lib/snapshot';

it('renders correctly', () => {
  snapshot(<AvatarItem src = '../static/imgs/startup_grind.jpg' alt='Startup Grind' variant='circle' />);
  snapshot(<AvatarItem src = '../static/imgs/bevy_logo.jpg' alt='Bevy' variant='square' />);
});