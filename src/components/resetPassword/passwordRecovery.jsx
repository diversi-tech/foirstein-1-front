import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert, Paper, Box, CssBaseline } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Rubik,,Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#0D1E46',
    },
    secondary: {
      main: '#B71C1C',
    },
  },
});

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const api_url=process.env.REACT_APP_SERVER_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const storedEmail = sessionStorage.getItem('userEmail');
    if (email !== storedEmail || !email.includes('@')) {
      setEmailError(true);
      setMessage('כתובת מייל לא תקינה');
      return;
    }

    try {
      await axios.get(`${api_url}/api/Users/password-recovery/${email}`);
      setMessage('מייל לאיפוס סיסמה נשלח בהצלחה');
      setEmailError(false);
      // navigate('/login'); // הפניה לעמוד ההתחברות לאחר השליחה
    } catch (error) {
      console.error('Error sending password recovery email:', error);
      setMessage('שגיאה בשליחת המייל, אנא נסה שנית');
      setEmailError(true);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
    setMessage('');
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xs">
          <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
            <Typography variant="h4" gutterBottom align="center">
              איפוס סיסמה
            </Typography>
            {message && <Alert severity={emailError ? "error" : "success"} sx={{ mb: 2 }}>{message}</Alert>}
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { mb: 2 },
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}
              onSubmit={handleSubmit}
            >
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
              />
              <Button variant="contained" color="primary" type="submit" fullWidth>
                שליחת מייל לאיפוס סיסמה
              </Button>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default PasswordRecovery;
