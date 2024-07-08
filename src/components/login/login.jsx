import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FillData } from '../../redux/actions/userAction';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);

  const handleLogin = async () => {
    setError('');
    try {
      const response = await axios.get(`http://localhost:5211/api/Users/${username}/${password}`);
      if (response.data === "משתמש קיים") {
        dispatch(FillData(response.data));
        navigate('/home');
      } else if (response.data === "משתמש לא קיים") {
        setError('אחד מהפרטים שהזנתה שגוי');
      } else if (response.data === "סיסמה שגויה") {
        setError('סיסמה לא נכונה');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('שגיאת שרת, נסה שוב מאוחר יותר');
    }
  };

  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="text" onClick={() => navigate('/security-question')}>
            איפוס סיסמה
          </Button>
        </Box>
        <Typography variant="h4" gutterBottom align="center">
          התחברות
        </Typography>
       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          label="שם משתמש"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="סיסמה"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleLogin}
        >
          התחברות
        </Button>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="text"
            fullWidth
            onClick={() => navigate('/register')}
          >
            להרשמה
          </Button>
        </Box>
      </Paper>
    </Container>
    </ThemeProvider>
  );
};

export default Login;