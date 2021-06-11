import React from 'react';
import ChipItem from './Chip';


export default {
  title: 'Chip',
  component: ChipItem,
};

const Template = args => <ChipItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: 'primary',
  label: 'Mock Label',
  variant: 'default',
};

export const Outlined = Template.bind({});
Outlined.args = {
  color: 'secondary',
  label: 'Alternate Label',
  variant: 'outlined',   
};