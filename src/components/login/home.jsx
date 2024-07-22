import React,{useState} from 'react';
import { ThemeProvider, CssBaseline, Container, Grid, TextField, Box, Paper, Typography, Button } from '@mui/material';
import theme from '../../theme'; // ייבוא הנושא שהגדרת
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('jwt'));
  const navigate = useNavigate();
  const checkIn=()=>{
    if(!isLoggedIn)
      navigate('/login')
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container disableGutters maxWidth={false}>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundImage: 'url(../../../assets/pic/books.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '400px',
                  width: '100%',
                  padding: 4,
                }}
              >
                <Paper elevation={3} sx={{ padding: 2, maxWidth: 600, width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                  <Typography variant="h6" gutterBottom align="right">
                    HUfind
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="הקלידו מילה..."
                    margin="normal"
                  />
                  <Button onClick={checkIn} fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    חיפוש
                  </Button>
                  <Button fullWidth variant="text" color="primary" sx={{ marginTop: 2 }}>
                    חיפוש מתקדם
                  </Button>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box my={4}>
                <Typography variant="h5" align="right">הודעות ועדכונים</Typography>
                <Typography align="right">חדש בספריות: ספריית הרמן למדעי הטבע...</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ backgroundColor: theme.palette.background.paper, padding: 2, marginTop: 4 }}>
          <Container>
            <Typography variant="body1" align="center">
            מרחבית - מרחב התוכן של בית יעקב
            </Typography>
          </Container>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
