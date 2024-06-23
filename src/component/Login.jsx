import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const URL = 'http://localhost:1234/checkUser';

export const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const checkUserExistence = async () => {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.exists) {
        navigate('/welcome');
      } else {
        navigate('/logon');
      }
    } else {
      // Handle error
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={checkUserExistence}>
        Check User
      </Button>
    </div>
  );
};

export default Login;
