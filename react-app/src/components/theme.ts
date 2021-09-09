import { createTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    flexiCharge: {
      font: {
        _main: string
        Lato: string
      }
      primary: {
        black: string
        darkGrey: string
        grey: string
        lightGrey: string
        white: string
      }
      accent: {
        primary: string
        secondary: string
        warning: string
        neutral: string
        error: string
      }
    }
  }
  // To allow configuration using `createTheme`
  interface ThemeOptions {
    flexiCharge: {
      font: {
        _main: string
        Lato: string
      }
      primary: {
        black: string
        darkGrey: string
        grey: string
        lightGrey: string
        white: string
      }
      accent: {
        primary: string
        secondary: string
        warning: string
        neutral: string
        error: string
      }
    }
  }
}

const flexiChargeTheme = createTheme({
  flexiCharge: {
    font: {
      _main: '"Lato", sans-serif',
      Lato: '"Lato", sans-serif'
    },
    primary: {
      black: '#000000',
      darkGrey: '#222222',
      grey: '#333333',
      lightGrey: '#e5e5e5',
      white: '#ffffff'
    },
    accent: {
      primary: '#78bd76',
      secondary: '#f0c200',
      warning: '#f0c200',
      neutral: '#5e5eb7',
      error: '#ef6048'
    }
  }
});

export default flexiChargeTheme;