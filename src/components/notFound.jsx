import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      p={2}
      mb={-15}
      mt={-10}
    >
      <Box
        component="img"
        src={'/bookshelf.png'}
        alt="Logo"
        sx={{
          width: { xs: '150px', sm: '200px', md: '250px' },
          marginBottom: '20px',
        }}
      />
      <Typography variant="h4" gutterBottom>
        הדף שחיפשת אינו נמצא - 404
      </Typography>
      <Typography variant="body1" gutterBottom>
        מצטערים , הדף שאתה מחפש אינו נמצא
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        חזרה לדף הקודם
      </Button>
    </Box>
  );
};

export default NotFoundPage;

