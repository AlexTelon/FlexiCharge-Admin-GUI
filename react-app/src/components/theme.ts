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
      gradient: string
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
      gradient: string
    }
  }
}

const flexiChargeTheme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#78bd76',
          borderRadius: '5px'
        },
        '*::-webkit-scrollbar': {
          width: '10px'
        },
        '*::webskit-scrollbar-track': {
          backgroundColor: 'transparent',
          marginBottom: '3px',
          marginTop: '3px'
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#78bd76',
      light: '#78bd76',
      dark: '#78bd76'
    }
  },
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
    },
    gradient: 'linear-gradient(90deg, rgba(240,194,0,1) 0%, rgba(208,195,48,1) 15%, rgba(120,219,118,1) 80%, rgba(64,156,104,1) 100%)'
  }
});

export default flexiChargeTheme;