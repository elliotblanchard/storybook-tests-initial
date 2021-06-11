import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import _merge from 'lodash/merge';

import createTheme from './create-theme';
import deepObjectTransform from '../utils/deepObjectTransform';
import getStyleValueFromVarString from '../utils/getStyleValueFromVarString';

export const useBDSTheme = (customStyles, useStyleEditorSettings = true) => {
  let styles =
    // eslint-disable-next-line no-undef
    typeof _BEVY_STYLES_ === 'undefined' || !useStyleEditorSettings
      ? undefined
      : formatStylesWithCSSVars(_BEVY_STYLES_);
  if (customStyles) styles = _merge({}, styles, customStyles);
  const theme = createTheme(styles);
  return theme;
};

export const formatStylesWithCSSVars = style =>
  style ? deepObjectTransform(style, getStyleValueFromVarString) : {};

const ThemeProvider = props => {
  const theme = props.theme || useBDSTheme(undefined, props.useStyleEditorSettings);
  return (
    <MuiThemeProvider {...props} theme={theme}>
      {props.children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
