
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import userService from "../../axios/userAxios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [idNumber, setIdNumber] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const storedIdNumber = localStorage.getItem("idNumber");
    if (storedIdNumber) {
      setIdNumber(storedIdNumber);
    }
  }, []);
  const theme = (outerTheme) =>
    createTheme({
        mode: outerTheme.palette.mode,
      palette: {
        primary: {
          main: '#0D1E46',
        },
        secondary: {
          main: '#0D1E46',
        },
        }
    });
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
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
      const data = await userService.changePassword(idNumber, newPassword);
      navigate("/password-reset-success");
    } catch (err) {
      setMessage(err.message);
    }
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const isButtonDisabled =
    !newPassword || !confirmPassword || newPassword !== confirmPassword;
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom textAlign={"center"}>
          איפוס סיסמה
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" color="textSecondary" textAlign="left">
              נא להזין את הפרטים הבאים כדי לאפס את הסיסמה שלך:
            </Typography>
          </Box>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <div dir="rtl">
                <TextField
                  variant="outlined"
                  fullWidth
                  name="newPassword"
                  label="סיסמה חדשה"
                  id="newPassword"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                    sx: { textAlign: "left" }, // כתיבה מתחילה בצד שמאל
                  }}
                  inputProps={{
                    style: { textAlign: "left" }, // כתיבה מתחילה בצד שמאל
                  }}
                  InputLabelProps={{
                    style: {
                      right: 0,
                      left: "auto",
                      transformOrigin: "top right",
                    }, // הוספת padding ימני
                  }}
                />
              </div>
            </ThemeProvider>
          </CacheProvider>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <div dir="rtl">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="אימות סיסמה"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { textAlign: "left" }, // כתיבה מתחילה בצד שמאל
                  }}
                  ש
                  inputProps={{
                    style: { textAlign: "left" }, // כתיבה מתחילה בצד שמאל
                  }}
                  InputLabelProps={{
                    style: {
                      right: 0,
                      left: "auto",
                      transformOrigin: "top right",
                    }, // הוספת padding ימני
                  }}
                />
              </div>
            </ThemeProvider>
          </CacheProvider>
          {message && (
            <Typography
              variant="body2"
              color={
                message.includes("שגיאה") || message.includes("אינן תואמות")
                  ? "error"
                  : "textSecondary"
              }
              align="center"
              sx={{
                mt: 2,
                color:
                  message.includes("שגיאה") || message.includes("אינן תואמות")
                    ? "error.main"
                    : "text.secondary",
              }}
            >
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
  );
};
export default ResetPassword;