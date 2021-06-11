import { createMuiTheme } from '@material-ui/core/styles';
import _merge from 'lodash/merge';

export const defaultStyles = {
  primary: '#556cd6',
  secondary: '#19857b',
  error: '#ff0000',
  backgroundColor: '#fff',
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
  },
  roundedCornersBorderRadius: 4,
  linkColor: '#333',
  alertColor: '#FF5A64',
  focusColor: '#8252FF',
  label: {
    color: '#333',
  },
  input: {
    borderColor: '#b3b3b3',
    borderRadius: 0,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 2,
    marginTop: 8,
    focused: {
      borderColor: '#66afe9',
    },
    hover: {
      borderColor: '#b3b3b3',
    },
    error: {
      borderColor: '#d9534f',
    },
    boxShadow: 'none !important',
  },
  button: {
    minHeight: 36,
    boxShadow: 'none',
    borderRadius: 0,
    borderStyle: 'solid',
    borderWidth: '1px',
    fontSize: '0.75rem',
    textTransform: 'none',
    fontWeight: 'bold',
    lineHeight: 1.75,
    padding: '6px 16px',
    disabled: {
      backgroundColor: '#ccc',
      color: '#888',
    },
    primary: {
      backgroundColor: '#333333',
      color: '#ffffff',
      borderColor: '#333333',
      hover: {
        backgroundColor: '#454545',
        color: '#ffffff',
        borderColor: '#333333',
      },
      focused: {
        backgroundColor: '#666666',
        color: '#ffffff',
        borderColor: '4d4d4d',
        boxShadow: '0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24)',
      },
      active: {
        backgroundColor: '#666666',
        color: '#fff',
        borderColor: '#666666',
        boxShadow: 'inset 0px 3px 3px rgba(0, 0, 0, 0.1)',
      },
    },
    secondary: {
      backgroundColor: '#fff',
      color: '#333',
      borderColor: '#333333',
      hover: {
        backgroundColor: '#f2f2f2',
        color: '#333',
        borderColor: '#333',
      },
      focused: {
        backgroundColor: '#f4f4f4',
        color: '#333',
        borderColor: '333',
        boxShadow: '0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24)',
      },
      active: {
        backgroundColor: '#f4f4f4',
        color: '#333',
        borderColor: '#333',
        boxShadow: 'inset 0px 3px 3px rgba(0, 0, 0, 0.1)',
      },
    },
    ghost: {
      borderColor: '#333333',
      backgroundColor: 'transparent',
      color: '#333333',
      hover: {
        backgroundColor: '#f4f4f4',
        color: '#333333',
      },
      active: {
        backgroundColor: '#dddddd',
        color: '#333333',
      },
      focused: {
        backgroundColor: '#f4f4f4',
        color: '#333333',
      },
    },
  },
  iconButton: {
    padding: 6,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff',
  },
  checkbox: {
    border: '#666666',
    checked: {
      backgroundColor: '#333333',
    },
    hover: {
      backgroundColor: 'rgba(51,51,51,0.05)',
    },
  },
  appBar: {
    backgroundColor: '#fff',
    color: '#323132',
    boxShadow: 'none',
    justifyContent: 'center',
  },
  chip: {
    margin: 5,
    fontSize: '0.875rem',
    backgroundColor: '#f4f4f4',
    color: '#333333',
    outlined: {
      color: '#fff',
      borderColor: '#fff',
    },
  },
  select: {
    backgroundColor: 'transparent',
    focused: {
      backgroundColor: 'transparent',
    },
    disabled: {
      backgroundColor: '#f5f5f5',
      cursor: 'not-allowed',
    },
    item: {
      hover: {
        backgroundColor: 'rgba(0,0,0,0.05)',
      },
      selected: {
        color: '#ffffff',
        backgroundColor: 'rgba(0,0,0,0.65)',
      },
    },
  },
  card: {
    backgroundColor: '#fff',
    borderColor: '#eee',
    internalBorderColor: '#f2f2f2',
    borderRadius: 0,
  },
  covers: {
    backgroundColor: '#F1F2F8',
    color: '#333333',
  },
  assets: {
    logo: {
      lightBGSVG: undefined,
      darkBGSVG: undefined,
      lightBGPNG: undefined,
      darkBGPNG: undefined,
    },
  },
};

function createTheme(configuration = {}) {
  const styles = _merge({}, defaultStyles, configuration);
  return createMuiTheme({
    palette: {
      primary: {
        main: styles.primary,
      },
      secondary: {
        main: styles.secondary,
      },
      error: {
        main: styles.error,
      },
      background: {
        default: styles.backgroundColor,
      },
      text: styles.text,
    },
    typography: {
      fontFamily: 'inherit',
    },
    overrides: {
      MuiLink: {
        root: {
          cursor: 'pointer',
        },
      },
      MuiInputBase: {
        root: {
          backgroundColor: '#fff',
        },
      },
      MuiSnackbarContent: {
        root: {
          paddingTop: 11,
          paddingBottom: 11,
        },
      },
      MuiFormLabel: {
        root: {
          color: styles.label.color,
          zIndex: 1,
          '&$focused': {
            color: styles.label.color,
          },
          '&$error': {
            color: styles.label.color,
          },
        },
      },
      MuiAppBar: {
        root: {
          boxShadow: styles.appBar.boxShadow,
          justifyContent: styles.appBar.justifyContent,
        },
        colorPrimary: {
          backgroundColor: styles.appBar.backgroundColor,
          color: styles.appBar.color,
        },
      },
      MuiButton: {
        root: {
          minWidth: 0,
          transitionProperty: 'background-color, box-shadow, border, color',
        },
        contained: {
          backgroundColor: styles.button.primary.backgroundColor,
          color: styles.button.primary.color,
          borderColor: styles.button.primary.borderColor,
          borderStyle: styles.button.borderStyle,
          borderWidth: styles.button.borderWidth,
          fontSize: styles.button.fontSize,
          textTransform: styles.button.textTransform,
          fontWeight: styles.button.fontWeight,
          lineHeight: styles.button.lineHeight,
          padding: styles.button.padding,
          minHeight: styles.button.minHeight,
          boxShadow: styles.button.boxShadow,
          borderRadius: styles.button.borderRadius,
          '&:hover': {
            backgroundColor: styles.button.primary.hover.backgroundColor,
            color: styles.button.primary.hover.color,
            borderColor: styles.button.primary.hover.borderColor,
            borderStyle: styles.button.borderStyle,
            borderWidth: styles.button.borderWidth,
            boxShadow: 'none',
          },
          '&:focus': {
            backgroundColor: styles.button.primary.focused.backgroundColor,
            color: styles.button.primary.focused.color,
            borderColor: styles.button.primary.focused.borderColor,
            borderStyle: styles.button.borderStyle,
            borderWidth: styles.button.borderWidth,
            boxShadow: styles.button.primary.focused.boxShadow,
          },
          '&:active': {
            backgroundColor: styles.button.primary.active.backgroundColor,
            color: styles.button.primary.active.color,
            borderColor: styles.button.primary.active.borderColor,
            borderStyle: styles.button.borderStyle,
            borderWidth: styles.button.borderWidth,
            boxShadow: styles.button.primary.active.boxShadow,
          },
          '&:disabled': {
            backgroundColor: styles.button.disabled.backgroundColor,
            borderColor: styles.button.disabled.backgroundColor,
            color: styles.button.disabled.color,
          },
          '&$disabled': {
            backgroundColor: styles.button.disabled.backgroundColor,
            borderColor: styles.button.disabled.backgroundColor,
            color: styles.button.disabled.color,
          },
        },
        label: {
          height: '100%',
        },
      },
      MuiCheckbox: {
        colorPrimary: {
          color: styles.checkbox.border,
          '&$checked': {
            color: styles.checkbox.checked.backgroundColor,
            '&:hover': {
              backgroundColor: styles.checkbox.hover.backgroundColor,
            },
          },
        },
      },
      MuiChip: {
        root: {
          margin: styles.chip.margin,
          backgroundColor: styles.chip.backgroundColor,
          color: styles.chip.color,
          fontSize: styles.chip.fontSize,
        },
        outlined: {
          color: styles.chip.outlined.color,
          borderColor: styles.chip.outlined.borderColor,
        },
      },
      MuiGrid: {
        item: {
          maxWidth: '100%',
        },
      },
      MuiPaper: {
        root: {
          minWidth: 180,
        },
      },
      MuiFilledInput: {
        root: {
          backgroundColor: 'transparent',
        },
      },
      MuiMenuItem: {
        root: {
          '@media (min-width:600px)': {
            minHeight: 54,
          },
        },
      },
      MuiOutlinedInput: {
        root: {
          '& $notchedOutline': {
            borderColor: styles.card.borderColor,
            borderWidth: styles.input.borderWidth,
          },
          '&$error $notchedOutline': {
            borderColor: styles.input.error.borderColor,
            borderWidth: styles.input.borderWidth,
          },
          '&$focused $notchedOutline': {
            borderColor: styles.input.focused.borderColor,
            borderWidth: styles.input.borderWidth,
          },
          '&:hover $notchedOutline': {
            borderColor: styles.input.hover.borderColor,
            borderWidth: styles.input.borderWidth,
          },
          '& fieldset': {
            borderRadius: styles.input.borderRadius,
          },
          margin: 'dense',
        },
        inputMarginDense: {
          paddingTop: styles.input.paddingVertical,
          paddingBottom: styles.input.paddingVertical,
          paddingLeft: styles.input.paddingHorizontal,
          paddingRight: styles.input.paddingHorizontal,
        },
        inputMultiline: {
          minHeight: 60,
        },
      },
      MuiInputLabel: {
        outlined: {
          zIndex: 0,
        },
      },
      MuiSelect: {
        select: {
          '&:focus': {
            backgroundColor: styles.select.focused.backgroundColor,
          },
          '&$disabled': {
            backgroundColor: styles.select.disabled.backgroundColor,
            cursor: styles.select.disabled.cursor,
          },
        },
        icon: {
          color: styles.label.color,
        },
      },
      MuiListItem: {
        root: {
          '&:hover': {
            backgroundColor: styles.select.item.hover.backgroundColor,
          },
          '&$selected': {
            backgroundColor: styles.select.item.selected.backgroundColor,
            color: styles.select.item.selected.color,
            '&:hover': {
              backgroundColor: styles.select.item.selected.backgroundColor,
            },
          },
        },
      },
      MuiTextField: {
        root: {
          marginBottom: styles.input.marginBottom,
          background: '#fff',
        },
      },
    },
    custom: {
      iconButton: {
        primary: {
          padding: styles.iconButton.padding,
          borderWidth: styles.iconButton.borderWidth,
          borderStyle: styles.iconButton.borderStyle,
          borderColor: styles.iconButton.borderColor,
          backgroundColor: styles.button.primary.backgroundColor,
          color: styles.button.primary.color,
          '&:hover': {
            backgroundColor: styles.button.primary.hover.backgroundColor,
            color: styles.button.primary.hover.color,
          },
          '&:focus': {
            backgroundColor: styles.button.primary.focused.backgroundColor,
            color: styles.button.primary.focused.color,
          },
          '&:disabled': {
            backgroundColor: styles.button.disabled.backgroundColor,
            borderColor: styles.button.disabled.backgroundColor,
            color: styles.button.disabled.color,
          },
        },
        secondary: {
          padding: styles.iconButton.padding,
          borderWidth: styles.iconButton.borderWidth,
          borderStyle: styles.iconButton.borderStyle,
          borderColor: styles.button.secondary.borderColor,
          backgroundColor: styles.button.secondary.backgroundColor,
          color: styles.button.secondary.color,
          '&:hover': {
            backgroundColor: styles.button.secondary.hover.backgroundColor,
            color: styles.button.secondary.hover.color,
            borderColor: styles.button.secondary.hover.borderColor,
          },
          '&:focus': {
            backgroundColor: styles.button.secondary.focused.backgroundColor,
            color: styles.button.secondary.focused.color,
            borderColor: styles.button.secondary.focused.borderColor,
          },
          '&:disabled': {
            backgroundColor: styles.button.disabled.backgroundColor,
            borderColor: styles.button.disabled.backgroundColor,
            color: styles.button.disabled.color,
          },
        },
      },
      button: {
        secondary: {
          backgroundColor: styles.button.secondary.backgroundColor,
          color: styles.button.secondary.color,
          borderColor: styles.button.secondary.borderColor,
          '&:hover': {
            backgroundColor: styles.button.secondary.hover.backgroundColor,
            color: styles.button.secondary.hover.color,
            borderColor: styles.button.secondary.hover.borderColor,
            boxShadow: 'none',
          },
          '&:focus': {
            backgroundColor: styles.button.secondary.focused.backgroundColor,
            color: styles.button.secondary.focused.color,
            borderColor: styles.button.secondary.focused.borderColor,
            boxShadow: styles.button.secondary.focused.boxShadow,
          },
          '&:active': {
            backgroundColor: styles.button.secondary.active.backgroundColor,
            color: styles.button.secondary.active.color,
            borderColor: styles.button.secondary.active.borderColor,
            boxShadow: styles.button.secondary.active.boxShadow,
          },
        },
        transparent: {
          backgroundColor: styles.button.ghost.backgroundColor,
          borderColor: styles.button.ghost.backgroundColor,
          color: styles.button.ghost.color,
          '&:hover': {
            backgroundColor: styles.button.ghost.hover.backgroundColor,
            borderColor: styles.button.ghost.hover.backgroundColor,
            color: styles.button.ghost.hover.color,
          },
          '&:active': {
            backgroundColor: styles.button.ghost.active.backgroundColor,
            borderColor: styles.button.ghost.active.backgroundColor,
            boxShadow: 'none',
            color: styles.button.ghost.active.color,
          },
          '&:focus': {
            backgroundColor: styles.button.ghost.focused.backgroundColor,
            borderColor: styles.button.ghost.focused.backgroundColor,
            boxShadow: 'none',
            color: styles.button.ghost.focused.color,
          },
        },
      },
      dateTimePicker: {
        container: {
          borderColor: styles.input.borderColor,
          borderRadius: styles.input.borderRadius,
          borderWidth: styles.input.borderWidth,
          '&:focus-within': {
            boxShadow: styles.input.boxShadow,
          },
          '&:hover': {
            boxShadow: styles.input.boxShadow,
          },
          margin: `${styles.input.marginTop + 1}px 0 ${styles.input.marginBottom}px 0 !important`,
          '& .rw-select-bordered': {
            borderLeft: 'none',
          },
        },
        containerError: {
          borderColor: styles.error,
          borderRadius: styles.input.borderRadius,
          borderWidth: styles.input.borderWidth,
          '&:focus-within': {
            borderColor: styles.error,
            boxShadow: styles.input.boxShadow,
          },
          '&:hover': {
            borderColor: `${styles.error} !important`,
            boxShadow: styles.input.boxShadow,
          },
          margin: `${styles.input.marginTop}px 0 ${styles.input.marginBottom}px 0 !important`,
        },
        input: {
          padding: `${styles.input.paddingVertical}px ${styles.input.paddingHorizontal}px`,
          fontSize: '1rem',
          height: 35,
          paddingRight: 0,
        },
      },
      smallLabel: {
        fontSize: '0.8rem',
      },
      card: styles.card,
      link: { color: styles.linkColor },
      alertColor: styles.alertColor,
      focusColor: styles.focusColor,
    },
    covers: {
      backgroundColor: styles.covers.backgroundColor,
      color: styles.covers.color,
    },
    assets: {
      logo: {
        lightBGSVG: styles.assets.logo.lightBGSVG,
        darkBGSVG: styles.assets.logo.darkBGSVG,
        lightBGPNG: styles.assets.logo.lightBGPNG,
        darkBGPNG: styles.assets.logo.darkBGPNG,
      },
    },
  });
}

export default createTheme;
