import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Alert, Paper, Box, CssBaseline, IconButton, InputAdornment } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { FillData } from '../../redux/actions/userAction';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import userService from '../../axios/userAxios';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Arial, sans-serif',
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

const Login = () => {
  const [tz, setTz] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [userExists, setUserExists] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserExists = async () => {
      if (tz.length === 9) {
        try {
          const exists = await userService.verifyIdNumber(tz);
          setUserExists(exists);
        } catch (err) {
          console.error('Error verifying ID number:', err);
        }
      } else {
        setUserExists(false);
      }
    };
    checkUserExists();
  }, [tz]);

  const handleLogin = async () => {
    setError('');
    try {
      const response = await axios.post("https://foirstein-1-back.onrender.com/api/Users/login", {
        tz: tz,
        pass: password
      });
      if (response.data.token) {
        sessionStorage.setItem('jwt', response.data.token);
        sendTokenToOtherProjects();
        dispatch(FillData(response.data));
        navigate('/search');
        window.location.reload();
      } else if (response.data.token === null) {
        setError('סיסמה לא נכונה');
      } else {
        setError('לא קיים במערכת');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('שגיאה נסה שוב מאוחר יותר');
    }
  };

  function sendTokenToOtherProjects() {
    const token = sessionStorage.getItem('jwt');
    const targetOrigins = [
      'https://diversi-tech.github.io/foirstein-3-front/#/',
      'https://foirstein-2-front-1.onrender.com/'
    ];    // שולח את ההודעה עם התוקן
    targetOrigins.forEach(origin => {
      window.postMessage({ token: token }, origin);
    });  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordReset = async () => {
    try {
      const user = await userService.verifyIdNumber(tz);
      if (user.role === 'Student') {
        setError('בשביל לאפס סיסמא נא לגשת לספרנית');
      } else {
        navigate('/passwordRecovery');
      }
    } catch (err) {
      console.error('Error fetching user role:', err);
      setError('שגיאה בודקת את התפקיד, נסה שוב מאוחר יותר');
    }
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xs">
          <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
            <Typography variant="h4" gutterBottom align="center">התחברות</Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { mb: 2 },
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}
            >
              <TextField
                label="תעודת זהות*"
                dir='rtl'
                variant="outlined"
                fullWidth
                margin="normal"
                value={tz}
                onChange={(e) => setTz(e.target.value)}
              />
              <TextField
                label="סיסמה*"
                dir='rtl'
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {userExists && (
                <Button
                  variant="text"
                  onClick={handlePasswordReset}
                  sx={{ alignSelf: 'flex-end' }}
                >
                  איפוס סיסמה
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleLogin}
              >
                התחברות
              </Button>
            </Box>
            <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
              <Button variant="text" onClick={() => navigate('register')}>
                להרשמה
              </Button>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Login;
