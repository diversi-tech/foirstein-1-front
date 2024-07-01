import { createTheme } from '@mui/material/styles';
import { heIL } from '@mui/material/locale';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: 16,
    // ...שאר ההגדרות
  },
  palette: {
    primary: {
      main: '#0D47A1',
    },
    secondary: {
      main: '#B71C1C',
    },
    text: {
      primary: '#000000',
      secondary: '#FFFFFF',
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '& .MuiInputLabel-root': {
            right: 0,
            left: 'auto',
            transformOrigin: 'top right',
            textAlign: 'right',
            width: 'auto',
          },
          '& .MuiOutlinedInput-root': {
            '& input': {
              textAlign: 'right',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 48,
          height: 48,
        },
      },
    },
  },
}, heIL);

export default theme;
