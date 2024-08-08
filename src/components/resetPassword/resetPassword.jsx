import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme } from '@mui/material/styles';
import {jwtDecode} from 'jwt-decode';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const api_url=process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    console.log("Token from URL:", token);

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded Token:', decoded); // בדיקת תוכן הטוקן

        const userIdFromToken = decoded['userId'];
        
        if (userIdFromToken) {
          const parsedUserId = parseInt(userIdFromToken, 10);
          if (!isNaN(parsedUserId)) {
            setUserId(parsedUserId);
          } else {
            setMessage("שגיאה בהמרת מזהה המשתמש");
          }
        } else {
          setMessage("שגיאה בזיהוי המשתמש");
        }
      } catch (error) {
        console.error("Error decrypting token:", error);
        setMessage("שגיאה בפענוח הטוקן");
      }
    } else {
      setMessage("לא נמצא טוקן בכתובת ה-URL");
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("הסיסמאות אינן תואמות");
      return;
    }
    if (newPassword.length < 3) {
      setMessage("הסיסמה חייבת להכיל לפחות 3 תווים");
      return;
    }
    try {
      await axios.put(`${api_url}/api/Users/reset-password`, {
        userId,
        newPassword,
      });
      navigate("/password-reset-success");
    } catch (err) {
      setMessage("שגיאה באיפוס הסיסמא");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isButtonDisabled = !newPassword || !confirmPassword || newPassword !== confirmPassword;

  const theme = createTheme({
    direction: 'rtl',
    palette: {
      primary: {
        main: '#3f51b5',
      },
    },
    typography: {
      fontFamily: 'Rubik,Arial, sans-serif',
    },
  });

  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom textAlign={"center"}>
              איפוס סיסמה
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} dir="rtl">
              <TextField
                variant="outlined"
                fullWidth
                name="newPassword"
                label="סיסמה חדשה"
                id="newPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="אימות סיסמה"
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {message && (
                <Typography variant="body2" color="error" align="center">
                  {message}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                disabled={isButtonDisabled}
              >
                איפוס סיסמה
              </Button>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ResetPassword;
