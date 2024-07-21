// src/Home.js
// import React from 'react';
// import { Container, Typography, Box } from '@mui/material';

// export const Home = () => {
//   return (
//     <Container maxWidth="xs">
//       <Box sx={{ mt: 8 }}>
//         <Typography variant="h4">WELCOME</Typography>
//       </Box>
//     </Container>
//   );
// };

// export default Home;
import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { LibraryBooks, Info } from '@mui/icons-material';
export const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom>
          ברוכים הבאים לספריה שלנו
        </Typography>
        <Typography variant="h6" color="textSecondary">
          גלו עולם של ידע והרפתקאות
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          mb: 4,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<LibraryBooks />}
          href="/catalog"
          sx={{ textTransform: 'none' }}
        >
          חיפוש בקטלוג
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<Info />}
          href="/about"
          sx={{ textTransform: 'none' }}
        >
          מידע נוסף
        </Button>
      </Box>
      <Box
        sx={{
          backgroundColor: '#F5F5F5',
          padding: 4,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="body1">
          הספריה שלנו מציעה מגוון רחב של ספרים, מספרות בדיונית ועד ספרות עיון, ממדע ועד אומנות ועוד הרבה. הצטרפו אלינו וצללו לעולם המרתק של הספרים.
        </Typography>
      </Box>
    </Container>
  );
};
export default Home;