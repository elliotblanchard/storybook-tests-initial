import React from 'react';
import AvatarItem from './Avatar';
import startupGrindImg from '../static/imgs/startup_grind.jpg';
import bevyLogoImg from '../static/imgs/bevy_logo.svg';


export default {
  title: 'Avatar',
  component: AvatarItem,
};

const Template = args => <AvatarItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: startupGrindImg,
  alt: 'Startup Grind',
  variant: 'circle',
};

export const Square = Template.bind({});
Square.args = {
    src: bevyLogoImg,
    alt: 'Bevy',
    variant: 'square',    
};
