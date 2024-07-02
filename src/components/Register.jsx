import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [megama, setMegama] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError('');
    try {
      const formData = new FormData();
      formData.append('Tz', idNumber);
      formData.append('UserName', username);
      formData.append('Fname', firstName);
      formData.append('Lname', lastName);
      formData.append('PasswordHash', password);
      formData.append('Email', email);
      formData.append('Role', 'Student');
      formData.append('UserDob', birthDate);
      formData.append('PhoneNumber', phone);
      formData.append('Megama', megama);
      if (image) {
        formData.append('ProfilePicture', image, image.name);
      }

      const response = await axios.post('http://localhost:5211/api/Users/addUser', formData, {
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
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h4" gutterBottom align="center">הרשמה</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          label="תעודת זהות"
          variant="outlined"
          fullWidth
          margin="normal"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
        />
        <TextField
          label="שם משתמש"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="שם פרטי"
          variant="outlined"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="שם משפחה"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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
        <TextField
          label="אימייל"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="תאריך לידה"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <TextField
          label="טלפון"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="מגמה"
          variant="outlined"
          fullWidth
          margin="normal"
          value={megama}
          onChange={(e) => setMegama(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginTop: '16px', marginBottom: '16px' }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleRegister}
        >
          הרשמה
        </Button>
      </Paper>
    </Container>
  );
};

export default Register;
