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
import Swal from 'sweetalert2'
import ActivityLogService from '../../axios/ActivityLogAxios';
import { jwtDecode } from 'jwt-decode';



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

function alertLogin(){
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "success",
    title: "התחברת בהצלחה"
  });
  }

 window.addEventListener('beforeunload', () => { deleteTokenCookie(); });


const Login = () => {
  const [tz, setTz] = useState('');
  const [password, setPassword] = useState('');
  const [secondaryPassword, setSecondaryPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSecondaryPassword, setShowSecondaryPassword] = useState(false);
  const [error, setError] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [isAdminOrLibrarian, setIsAdminOrLibrarian] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [secondaryPasswordFromEmail, setSecondaryPasswordFromEmail] = useState(''); // לשמור את הסיסמה השנייה
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    const checkUserExists = async () => {
      if (tz.length === 9) {
        try {
          const exists = await userService.verifyIdNumber(tz);
          setUserExists(exists);
          setIsAdminOrLibrarian(exists.role === 'Admin' || exists.role === 'Librarian');
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
        if (isAdminOrLibrarian) {
          try {
            const response1 = await userService.getAllUsers();
            const email1 = response1.find(user => user.tz === response.data.user.tz).email;
            const result = await axios.get(`https://foirstein-1-back.onrender.com/api/Users/password2/${email1}`);
            setSecondaryPasswordFromEmail(result.data); // הנחת את הסיסמה השנייה
            debugger
            setModalMessage("נשלחה אליך סיסמה שנייה למייל לצרכי אבטחה");
            setShowSuccessMessage(true);
            setShowSecondaryPassword(true);
          } catch (error) {
            console.error('Error sending secondary password to user:', error);
            setError('נכשל בהבאת נתונים מהשרת');
          }
        } else {
        // sessionStorage.setItem('jwt', response.data.token, { domain: '.foirstein.diversitech.co.il' });
        const token = response.data.token;
        // הגדרת ה-cookie עם ה-token
        document.cookie = `jwt=${token}; path=/; domain=.foirstein.diversitech.co.il; Secure; expires=Session`;
        dispatch(FillData(response.data));
        const decoded = parseInt( jwtDecode(response.data.token)['userId'], 10);
        const activityLog = {
          
          LogId: 0, 
          UserId: response.data.user.tz,
          Activity: 'התחברות',
          Timestamp: new Date(),
          UserId1: decoded,
          UserId1NavigationUserId: decoded
        };
  
         await ActivityLogService.addActivityLog(activityLog)
          .then(activityResponse => {
            console.log('Activity log added successfully:', activityResponse);
          })
          .catch(activityError => {
            console.error('Error adding activity log:', activityError);
          });
        navigate('/search');
        window.location.reload();
        }
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
      'https://librarian.foirstein.diversitech.co.il',
      'https://foirstein-2-front-1.onrender.com'
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

  const handleClickShowSecondaryPassword = () => {
    setShowSecondaryPassword(!showSecondaryPassword);
  };

  const handlePasswordReset = async () => {
    try {
      const user = await userService.verifyIdNumber(tz);
      if (user.role === 'Student') {
        setError('בשביל לאפס סיסמא נא לגשת לספרנית');
      } else {
        sessionStorage.setItem('userEmail', user.email);
        navigate('/passwordRecovery');
      }
    } catch (err) {
      console.error('Error fetching user role:', err);
      setError('שגיאה בודקת את התפקיד, נסה שוב מאוחר יותר');
    }
  };
  const handleSecondaryLogin = async () => {
    debugger 
    if (secondaryPassword == secondaryPasswordFromEmail) {
        const response = await axios.post("https://foirstein-1-back.onrender.com/api/Users/login", {
          tz: tz,
          pass: password
        });
        if (response.data.token) {
          alertLogin();
          sendTokenToOtherProjects(); 
          const token = response.data.token;
          document.cookie = `jwt=${token}; path=/; domain=.foirstein.diversitech.co.il; Secure; expires=Session`;
          dispatch(FillData(response.data));
          const decoded = parseInt( jwtDecode(response.data.token)['userId'], 10);
          const activityLog = {
            LogId: 0, 
            UserId: response.data.user.tz,
            Activity: 'התחברות',
            Timestamp: new Date(),
            UserId1: decoded,
            UserId1NavigationUserId: decoded
          };
    
           await ActivityLogService.addActivityLog(activityLog)
            .then(activityResponse => {
              console.log('Activity log added successfully:', activityResponse);
            })
            .catch(activityError => {
              console.error('Error adding activity log:', activityError);
            });
            
          navigate('/search');
          window.location.reload();
        } else {
          setError('הסיסמה השנייה אינה נכונה');
        }
    } else {
      setError('הסיסמה השנייה אינה נכונה');
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
            {showSuccessMessage && <Alert severity="success" sx={{ mb: 2 }}>{modalMessage}</Alert>}
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
              {isAdminOrLibrarian && showSecondaryPassword && (
                <TextField
                  label="סיסמה שנייה*"
                  dir='rtl'
                  type={showSecondaryPassword ? 'text' : 'password'}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={secondaryPassword}
                  onChange={(e) => setSecondaryPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowSecondaryPassword}
                          onMouseDown={(event) => event.preventDefault()}
                          edge="end"
                        >
                          {showSecondaryPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
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
                onClick={showSecondaryPassword ? handleSecondaryLogin : handleLogin}
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
