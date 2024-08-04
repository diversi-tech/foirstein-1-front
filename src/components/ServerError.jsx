import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ServerError = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-2); // Navigate to the previous page
  };

  return (
    <Container>
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
          שגיאת שרת
        </Typography>
        <Typography variant="body1" gutterBottom>
          .חלה שגיאה בלתי צפויה בשרת. אנא נסה שוב מאוחר יותר
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          חזרה לדף הקודם
        </Button>
      </Box>
    </Container>
  );
};

export default ServerError;
