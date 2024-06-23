import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const URL = 'http://localhost:1234/register';

export const Logon = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const navigate = useNavigate();

  const registerUser = async () => {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    });

    if (response.ok) {
      navigate('/welcome');
    } else {
      // Handle error
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <TextField
        label="Name"
        variant="outlined"
        value={userDetails.name}
        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        label="Phone"
        variant="outlined"
        value={userDetails.phone}
        onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        label="Email"
        variant="outlined"
        value={userDetails.email}
        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={registerUser}>
        Register
      </Button>
    </div>
  );
};

export default Logon;
