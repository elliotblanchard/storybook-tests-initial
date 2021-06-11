import React from 'react';
import CheckboxItem from './Checkbox';
import { action } from '@storybook/addon-actions';


export default {
  title: 'Checkbox',
  component: CheckboxItem,
};

const Template = args => <CheckboxItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Mock Label',
  value: true,  
  onChange: isChecked => {
    action('checkbox change')(isChecked);
  },  
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Alt Label',
  value: false,   
  onChange: isChecked => {
    action('checkbox change')(isChecked);
  },  
};