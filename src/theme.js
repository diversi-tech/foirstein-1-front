// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl', // הוסף את השורה הזו לכיוון של עברית (ימין לשמאל)
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: 16,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: '1.5rem',
      textAlign: 'right', // שינוי לכיוון ימין
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: '1.25rem',
      textAlign: 'right', // שינוי לכיוון ימין
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: '1rem',
      textAlign: 'right', // שינוי לכיוון ימין
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: '1rem',
      textAlign: 'right', // שינוי לכיוון ימין
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: '1rem',
      textAlign: 'right', // שינוי לכיוון ימין
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: '1rem',
      textAlign: 'right', // שינוי לכיוון ימין
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      textAlign: 'right', // שינוי לכיוון ימין
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      textAlign: 'right', // שינוי לכיוון ימין
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      textAlign: 'right', // שינוי לכיוון ימין
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      textAlign: 'right', // שינוי לכיוון ימין
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
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
});

export default theme;
