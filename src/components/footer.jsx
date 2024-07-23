import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import theme from '../theme';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="footer"
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.secondary,
          padding: theme.spacing(4),
          marginTop: theme.spacing(8),
          textAlign: 'right',
          fontFamily: theme.typography.fontFamily,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="../../../assets/pic/logo.png" alt="Logo" style={{ maxWidth: '100%', maxHeight: '80px' }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>
                כתובתנו
              </Typography>
              <Typography variant="body1">
                סמטת ויצ"ו 4 בית שמש
                <br />
                מען למכתבים
                <br />
                ת.ד. 88 בית שמש 9910002
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>
                הספריה העירונית בית שמש
              </Typography>
              <Typography variant="body1">
                sifriyab.s1@gmail.com
                <br />
                טלפון: 02-9912385
                <br />
                פקס: 02-9991715
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>
                קישורים מהירים
              </Typography>
              <Link component={RouterLink} to="/" color="inherit" underline="none" sx={{ display: 'block', marginBottom: theme.spacing(1) }}>
                דף הבית
              </Link>
              <Link component={RouterLink} to="/login" color="inherit" underline="none" sx={{ display: 'block', marginBottom: theme.spacing(1) }}>
                התחברות
              </Link>
              <Link component={RouterLink} to="/ActivityLog" color="inherit" underline="none" sx={{ display: 'block', marginBottom: theme.spacing(1) }}>
                יומן פעילות
              </Link>
            </Grid>
            {/* כיתוב מרחבית מרחב התוכן של בית יעקב */}
            <Grid item xs={12}>
              <Typography variant="body2" align="center" fontSize={18} style={{ color: '#FFD700' }}>
                מרחבית - מרחב התוכן של בית יעקב
              </Typography>
            </Grid>
          </Grid>
        </Container>
 
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
