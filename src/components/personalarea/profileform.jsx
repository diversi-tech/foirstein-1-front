import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { TextField, Button, CssBaseline, Container, Typography, InputAdornment, IconButton, MenuItem } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import userService from '../../axios/userAxios'; // עדכן את הנתיב לפי מיקום הקובץ
import { createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import updateUser from '../../axios/userAxios';

function ProfileForm() {
  const user = useSelector(state => state.user) || {}; // קריאה לנתוני המשתמש מה־Redux state
  const dispatch = useDispatch();

  const [state, setState] = useState({
      username: user.username || '',
      password: user.password || '',
      email: user.email || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      idNumber: user.idNumber || '',
      role: user.role || 'Student',
      image: null,
      phone: user.phone || '',
      birthDate: user.birthDate || '',
      megama: user.megama || ''
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
      if (user) {
          setState({
              username: user.username || '',
              password: user.password || '',
              email: user.email || '',
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              idNumber: user.idNumber || '',
              role: user.role || 'Student',
              image: null,
              phone: user.phone || '',
              birthDate: user.birthDate || '',
              megama: user.megama || ''
          });
      }
  }, [user]);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
      setState(prevState => ({ ...prevState, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const updatedUser = { ...state };
          if (state.image) {
              const formData = new FormData();
              for (const key in updatedUser) {
                  formData.append(key, updatedUser[key]);
              }
              await userService.updateUser(formData);
          } else {
              await userService.updateUser(updatedUser);
          }
          dispatch(updateUser(updatedUser)); // עדכון נתוני המשתמש ב־Redux state
          console.log('User saved successfully');
      } catch (error) {
          console.error('Error updating user:', error);
      }
  };

  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };

  const theme = (outerTheme) =>
      createTheme({
          direction: 'rtl',
          palette: {
              mode: outerTheme.palette.mode,
          },
      });

  const cacheRtl = createCache({
      key: 'muirtl',
      stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
      <ThemeProvider theme={theme}>
          <CacheProvider value={cacheRtl}>
              <CssBaseline />
              <Container component="main" maxWidth="xs">
                  <Typography component="h1" variant="h5" align="center">
                      עריכת פרטים
                  </Typography>
                  <form dir="rtl" onSubmit={handleSubmit}>
                      <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="username"
                          label="שם משתמש"
                          name="username"
                          autoComplete="username"
                          value={state.username}
                          onChange={handleChange}
                      />
                      <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          name="password"
                          label="סיסמה"
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          autoComplete="current-password"
                          value={state.password}
                          onChange={handleChange}
                          InputProps={{
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={togglePasswordVisibility}
                                          edge="end"
                                      >
                                          {showPassword ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                  </InputAdornment>
                              )
                          }}
                      />
                      <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          name="email"
                          label="דואל"
                          type="email"
                          id="email"
                          value={state.email}
                          onChange={handleChange}
                      />
                      <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="firstName"
                          label="שם פרטי"
                          name="firstName"
                          value={state.firstName}
                          onChange={handleChange}
                      />
                      <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="lastName"
                          label="שם משפחה"
                          name="lastName"
                          value={state.lastName}
                          onChange={handleChange}
                      />
                      <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="idNumber"
                          label="תעודת זהות"
                          name="idNumber"
                          value={state.idNumber}
                          disabled
                      />
                      <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          select
                          id="role"
                          label="תפקיד"
                          name="role"
                          value={state.role}
                          onChange={handleChange}
                      >
                          <MenuItem value="Student">סטודנט</MenuItem>
                          <MenuItem value="Teacher">מורה</MenuItem>
                      </TextField>
                      <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="phone"
                          label="טלפון"
                          name="phone"
                          value={state.phone}
                          onChange={handleChange}
                      />
                      <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="birthDate"
                          label="תאריך לידה"
                          type="text"
                          value={state.birthDate}
                          disabled
                      />
                      <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="megama"
                          label="מגמה"
                          name="megama"
                          value={state.megama}
                          onChange={handleChange}
                      />

                      <input
                          type="file"
                          onChange={handleFileChange}
                          style={{ marginTop: '16px', marginBottom: '16px' }}
                      />
                      <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          style={{ marginTop: '1rem' }}
                      >
                          שמור
                      </Button>
                  </form>
              </Container>
          </CacheProvider>
      </ThemeProvider>
  );
}

export default ProfileForm;


