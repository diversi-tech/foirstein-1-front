import React, { useState } from 'react';
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setError('');
    try {
      const response = await axios.post("http://localhost:5211/api/Users/login", {
        name: username,
        pass: password
      });
      if (response.data.token) {
        dispatch(FillData(response.data));
        navigate('/home');
      } else if (response.data.token === null) {
        setError('סיסמה לא נכונה');
      } else {
        setError('שם משתמש לא קיים במערכת');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(' נסה שוב מאוחר יותר');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
                label="שם משתמש"
                dir='rtl'
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="סיסמה"
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
              <Button
                variant="text"
                onClick={() => navigate('/security-question')}
                sx={{ alignSelf: 'flex-end' }}
              >
                איפוס סיסמה
              </Button>
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
              <Button variant="text" onClick={() => navigate('/register')}>
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
