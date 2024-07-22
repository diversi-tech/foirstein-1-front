import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme } from '@mui/material/styles';

const outerTheme = {
  palette: {
    mode: 'light',
  },
};

const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#0D1E46',
    },
    secondary: {
      main: '#B71C1C',
    },
    text: {
      primary: '#000000',
      secondary: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: 16,
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: '1rem',
      textAlign: 'right',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      textAlign: 'right',
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
  },
});

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.includes('@')) {
      setEmailError(true);
      return;
    }
    try {
      await axios.get(`https://foirstein-1-back.onrender.com/api/Users/password-recovery/${email}`);
      setMessage('מייל לאיפוס סיסמה נשלח בהצלחה');
      // navigate('/login'); // נניח שתרצי להפנות את המשתמש לעמוד ההתחברות לאחר השליחה
    } catch (error) {
      console.error('Error sending password recovery email:', error);
      setMessage('שגיאה בשליחת המייל, אנא נסה שנית');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
          >
            <Typography variant="h4" gutterBottom>
              איפוס סיסמה
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="כתובת מייל"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                required
                fullWidth
                margin="normal"
                error={emailError}
                helperText={emailError ? 'כתובת מייל לא תקינה' : ''}
                size="small"
              />
              <Button variant="contained" color="primary" type="submit" fullWidth>
                שליחת מייל לאיפוס סיסמה
              </Button>
            </form>
            {message && (
              <Typography variant="body1" color={emailError ? "error" : "primary"} marginTop="1rem">
                {message}
              </Typography>
            )}
          </Box>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default PasswordRecovery;
