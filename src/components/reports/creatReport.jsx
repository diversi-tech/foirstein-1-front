import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Card, CardContent, Button, Typography, Container, Grid, CssBaseline, Snackbar, Alert, Divider } from '@mui/material';
import ReportDetails from './reportDetails';
import theme from '../../theme';
import NavBar from './minNav';

const customTheme = createTheme(theme, {
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: `0 0 10px ${theme.palette.primary.main}`, // Shadow color from the theme
          border: `2px solid ${theme.palette.primary.main}`, // Border color from the theme
          margin: '20px 0',
          minHeight: '250px', // Reduce the minimum height of the cards
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h5: {
          color: theme.palette.primary.main, // Same color as the border for uniformity
          fontSize: '2rem', // Increase the font size
          fontWeight: 'bold', // Make the text bold
        },
        body2: {
          color: '#333', // Darker color for better readability
          fontSize: '1.5rem', // Increase the font size
        },
        h4: {
          color: theme.palette.primary.main, // Consistent color for the header
          marginBottom: '10px', // Space between header and divider
          fontSize: '2rem', // Increase font size for the main title
          fontWeight: 'bold', // Make the main title bold
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '20px', // Top padding for container
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginTop: '20px', // Add top margin for the button
          alignSelf: 'flex-end', // Align button to the end of the flex container
          fontSize: '1.1rem', // Increase the button text size
          padding: '10px 20px', // Increase button padding for prominence
        },
      },
    },
  },
});

const ManagerDashboard = () => {

 
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [generatedReports, setGeneratedReports] = useState([]);
  const [reportNames, setReportNames] = useState({});
  const [selectedReport, setSelectedReport] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const reports = [
    { title: 'חיפושים', description: 'כאן תוכלו ליצור דוח על חיפושים וצלחים שהביאו לבקשת ספר או חומר' },
    { title: 'פעילות', description: 'צור דוח על כמות החיפושים של כל משתמש בחודש האחרון' },
    { title: 'שנתי', description: 'צור דוח על כמות המשתמשים שנוספו בכל שנה' },
    { title: 'דו"ח הכנסות', description: 'יצירת דו"ח על הכנסות ורווחים.' },
  ];

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleViewReports = () => {
    navigate('/view-reports', { state: { generatedReports } });
  };

  const handleReportClick = (report) => {
    setSelectedReport(report);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
    <NavBar></NavBar>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Container dir="rtl">
        <Typography variant="h4" component="h1" align="center">
          בחר דוחות
        </Typography>
        <Divider variant="fullWidth" sx={{ mb: 4, borderBottomWidth: 2 }} />
        <Grid container spacing={2} justifyContent="center">
          {reports.map((report, index) => (
            <Grid item key={index} xs={12} sm={6} md={3} lg={3}>
              <Card
                sx={{
                  minHeight: '250px', // Adjust minimum height here if needed
                  cursor: 'pointer',
                }}
                onClick={() => handleReportClick(report)}
              >
                <CardContent>
                  <Typography variant="h5" component="div" align="center">
                    {report.title}
                  </Typography>
                  <Typography variant="body2" component="div" align="center" sx={{ mt: 2 }}>
                    {report.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        {selectedReport && (
          <ReportDetails
            open={dialogOpen}
            handleClose={handleCloseDialog}
            report={selectedReport}
            reportNames={reportNames}
            setReportNames={setReportNames}
          />
        )}
      </Container>
    </ThemeProvider></>
  );
};

export default ManagerDashboard;
