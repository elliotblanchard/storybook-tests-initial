import createTheme, { defaultStyles } from './create-theme';
import { formatStylesWithCSSVars } from './provider';

describe('MUI createTheme', () => {
  afterAll(() => jest.clearAllMocks());

  it('returns default values when nothing is set', () => {
    const theme = createTheme();
    expect(theme.palette.primary.main).toEqual(defaultStyles.primary);
    expect(theme.palette.secondary.main).toEqual(defaultStyles.secondary);
    expect(theme.palette.error.main).toEqual(defaultStyles.error);
    expect(theme.palette.background.default).toEqual(defaultStyles.backgroundColor);
    expect(theme.overrides.MuiButton.contained.backgroundColor).toEqual(
      defaultStyles.button.primary.backgroundColor,
    );
  });
  it('returns the right values when they are set', () => {
    const theme = createTheme({
      primary: '#fff',
      secondary: '#ccc',
    });
    expect(theme.palette.primary.main).toEqual('#fff');
    expect(theme.palette.secondary.main).toEqual('#ccc');
    expect(theme.palette.error.main).toEqual(defaultStyles.error);
    expect(theme.palette.background.default).toEqual(defaultStyles.backgroundColor);
    expect(theme.overrides.MuiButton.contained.backgroundColor).toEqual(
      defaultStyles.button.primary.backgroundColor,
    );
  });

  it('should format styles with css var and nested styles correctly', () => {
    // only the text with var() pattern will be connverted with the value from the root style.
    // anything else should return as it is.

    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({
        getPropertyValue: jest.fn().mockReturnValue('#EEEEEE'),
      }),
    });

    const before = {
      primary: 'var(--theme-palette-primary)',
      secondary: 'invalid style',
      invalidKey: undefined,
      assets: { logo: {} },
      text: { primary: '#262626' },
      button: {
        primary: {
          backgroundColor: 'var(--theme-secondary-primary)',
          hover: {
            backgroundColor: '#6b00eb',
            color: 'var(any-text)',
          },
        },
      },
      avatarColors: ['var(--theme-palette-primary)', '#8252FF'],
    };

    const after = formatStylesWithCSSVars(before);

    const expected = {
      primary: '#EEEEEE',
      secondary: 'invalid style',
      invalidKey: undefined,
      assets: { logo: {} },
      text: { primary: '#262626' },
      button: {
        primary: {
          backgroundColor: '#EEEEEE',
          hover: {
            backgroundColor: '#6b00eb',
            color: '#EEEEEE',
          },
        },
      },
      avatarColors: ['#EEEEEE', '#8252FF'],
    };

    expect(after).toEqual(expected);
  });
});
