// import React, { useEffect, useState } from 'react';
// import { Container, Typography, Button, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import userService from '../../axios/userAxios'; // עדכון הנתיב בהתאם למיקום הקובץ
// import theme from '../../theme';
// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         debugger
//         const userData = await userService.getAllUsers(); // Assuming getAllUsers returns the logged-in user
//         setUser(userData[0]); // Adjust this according to the response
//       } catch (error) {
//         console.error('Failed to fetch user data:', error);
//       }
//     };
//     fetchUserData();
//   }, []);
//   if (!user) {
//     return <Typography>Loading...</Typography>;
//   }
//   return (
//     <Container maxWidth="sm" sx={{ mt: 8 }}>
//       <Box sx={{ textAlign: 'center' }}>
//         <Typography variant="h4" gutterBottom>
//           {user.firstName} {user.lastName}
//         </Typography>
//         <Typography variant="h6" gutterBottom>
//            {user.idNumber}
//         </Typography>
//         <Button
//   variant="contained"
//   color="primary"
//   onClick={() => navigate('/profileform')} // נתיב מתאים
// >
//  עריכת הפרטים
//  </Button>
//       </Box>
//     </Container>
//   );
// };
// export default Profile;