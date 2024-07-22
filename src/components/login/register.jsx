


import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert, Paper, Box, CssBaseline, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
const Register = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [megama, setMegama] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const validateIDNumber = (id) => {
    id = id.trim();
    if (id.length !== 9 || isNaN(id)) return 'תעודת זהות לא תקינה';
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      let num = parseInt(id[i]) * ((i % 2) + 1);
      if (num > 9) num -= 9;
      sum += num;
    }
    return sum % 10 === 0 ? '' : 'תעודת זהות לא תקינה';
  };
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) ? '' : 'אימייל לא תקין';
  };
  const validatePassword = (password) => {
    return password.length >= 4 ? '' : 'הסיסמה חייבת להכיל לפחות 4 תווים';
  };
  const validatePhone = (phone) => {
    return /^\d+$/.test(phone) ? '' : 'מספר הטלפון יכול להכיל רק ספרות';
  };
  const handleInputChange = (setter, validator, field) => (e) => {
    const value = e.target.value;
    setter(value);
    if (validator) {
      const error = validator(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: error,
      }));
    }
  };
  const handleRegister = async () => {
    let formErrors = {};
    if (!idNumber) {
      formErrors.idNumber = 'יש להזין תעודת זהות';
    } else {
      const idError = validateIDNumber(idNumber);
      if (idError) formErrors.idNumber = idError;
    }
    if (!password) {
      formErrors.password = 'יש להזין סיסמה';
    } else {
      const passwordError = validatePassword(password);
      if (passwordError) formErrors.password = passwordError;
    }
    if (!email) {
      formErrors.email = 'יש להזין אימייל';
    } else {
      const emailError = validateEmail(email);
      if (emailError) formErrors.email = emailError;
    }
    if (!firstName) {
      formErrors.firstName = 'יש להזין שם פרטי';
    }
    if (!lastName) {
      formErrors.lastName = 'יש להזין שם משפחה';
    }
    if (!birthDate) {
      formErrors.birthDate = 'יש להזין תאריך לידה';
    }
    if (!phone) {
      formErrors.phone = 'יש להזין טלפון';
    } else {
      const phoneError = validatePhone(phone);
      if (phoneError) formErrors.phone = phoneError;
    }
    if (!megama) {
      formErrors.megama = 'יש להזין מגמה';
    }
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) {
      return;
    }
    setErrors({});
    setError('');
    try {
      const formData = new FormData();
      formData.append('Tz', idNumber);
      formData.append('Fname', firstName);
      formData.append('Sname', lastName);
      formData.append('PasswordHash', password);
      formData.append('Email', email);
      formData.append('Role', 'Student');
      formData.append('UserDob', birthDate);
      formData.append('PhoneNumber', phone);
      formData.append('Megama', megama);
      if (image) {
        formData.append('ProfilePicture', image, image.name);
      }
      const response = await axios.post('https://foirstein-1-back.onrender.com/api/Users/addUser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data) {
        navigate('/login');
      } else {
        setError('הרשמה נכשלה, נסה שוב');
      }
    } catch (error) {
      console.error('Register error:', error);
      setError('שגיאת שרת, נסה שוב מאוחר יותר');
    }
  };
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xs">
          <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
            <Typography variant="h4" gutterBottom align="center">הרשמה</Typography>
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
                value={idNumber}
                onChange={handleInputChange(setIdNumber, validateIDNumber, 'idNumber')}
                error={!!errors.idNumber}
                helperText={errors.idNumber}
              />
              <TextField
                label="שם פרטי*"
                dir='rtl'
                variant="outlined"
                fullWidth
                margin="normal"
                value={firstName}
                onChange={handleInputChange(setFirstName, null, 'firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                label="שם משפחה*"
                dir='rtl'
                variant="outlined"
                fullWidth
                margin="normal"
                value={lastName}
                onChange={handleInputChange(setLastName, null, 'lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
              <TextField
                label="סיסמה*"
                dir='rtl'
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={handleInputChange(setPassword, validatePassword, 'password')}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="*אימייל"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={handleInputChange(setEmail, validateEmail, 'email')}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                label="*תאריך לידה"
                type="date"
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={birthDate}
                onChange={handleInputChange(setBirthDate, null, 'birthDate')}
                error={!!errors.birthDate}
                helperText={errors.birthDate}
              />
              <TextField
                label="טלפון*"
                dir='rtl'
                variant="outlined"
                fullWidth
                margin="normal"
                value={phone}
                onChange={handleInputChange(setPhone, validatePhone, 'phone')}
                error={!!errors.phone}
                helperText={errors.phone}
              />
              <TextField
                label="מגמה*"
                dir='rtl'
                variant="outlined"
                fullWidth
                margin="normal"
                value={megama}
                onChange={handleInputChange(setMegama, null, 'megama')}
                error={!!errors.megama}
                helperText={errors.megama}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleRegister}
                sx={{ mt: 3 }}
              >
                הרשמה
              </Button>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
};
export default Register;