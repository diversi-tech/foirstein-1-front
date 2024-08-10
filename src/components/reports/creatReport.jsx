import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Card, CardContent, Typography, Container, Grid, CssBaseline, Snackbar, Alert, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ActivityIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import ReportDetails from './reportDetails';
import theme from '../../theme';
import NavBar from './minNav';
import ReportService from '../../axios/reportsAxios';

const customTheme = createTheme(theme, {
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Subtle initial shadow
          backgroundColor: '#fff',
          border: 'none',
          margin: '20px 0',
          minHeight: '250px',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease', // Add transition for transform and box-shadow change
          '&:hover': {
            border: '2px solid #FFD700', 
            transform: 'scale(0.99)'
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h5: {
          color: theme.palette.primary.main,
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '10px',
        },
        body2: {
          color: '#555',
          fontSize: '1rem',
        },
        h4: {
          color: theme.palette.primary.main,
          marginBottom: '10px',
          fontSize: '2rem',
          fontWeight: 'bold',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '20px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginTop: '20px',
          alignSelf: 'flex-end',
          fontSize: '1.1rem',
          padding: '10px 20px',
        },
      },
    },
  },
});

const ManagerDashboard = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [generatedReports, setGeneratedReports] = useState([]);
  const [reportNames, setReportNames] = useState({});
  const [selectedReport, setSelectedReport] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const reports = [
    { title: 'התחברות', description: 'הצג רשימת משתמשים שהתחברו למערכת בתאריך מסוים', icon: <SearchIcon fontSize="large" /> },
    { title: 'פעילות', description: 'הצג לכל משתמש את כמות החיפושים שלו בחודש האחרון', icon: <ActivityIcon fontSize="large" /> },
    { title: 'שנתי', description: 'הצג את כמות המשתמשים שנוספו למערכת בכל שנה', icon: <PeopleIcon fontSize="large" /> },
    { title: 'חיפושים', description: 'הצג את החיפושים שהביאו לבקשת פריט', icon: <SearchIcon fontSize="large" /> },
  ];

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await ReportService.getAllReports();
      setGeneratedReports(response);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleReportClick = (report) => {
    setSelectedReport(report);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleViewReport = (report) => {
    if (!report.reportData) {
      console.error('No report data available');
      return;
    }
    const rows = report.reportData.trim().split('\n');
    const lastRow = rows[rows.length - 1]?.trim();
    if (!lastRow) {
      console.error('No last row data available');
      return;
    }
    const typeItem = lastRow.split(',').find(item => item.trim().startsWith('type:'));
    if (!typeItem) {
      console.error('No type found in last row');
      return;
    }
    const type = typeItem.split(':')[1]?.trim();
    navigate(`/report/${report.reportId}`, { state: { report, type } });
  };

  const handleReportGenerated = async () => {
    await fetchReports();
    const response = await ReportService.getAllReports();
    setGeneratedReports(response);
    const latestReport = response[response.length - 1];
    handleViewReport(latestReport);
  };

  return (
    <>
      <NavBar />
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
                    minHeight: '250px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleReportClick(report)}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    {report.icon}
                    <Typography variant="body2" component="div" sx={{ mt: 2 }}>
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
            <div style={{ color: 'red', textAlign: 'center' }}>
              {snackbarMessage}
            </div>
          </Snackbar>
          {selectedReport && (
            <ReportDetails
              open={dialogOpen}
              handleClose={handleCloseDialog}
              report={selectedReport}
              reportNames={reportNames}
              setReportNames={setReportNames}
              onReportGenerated={handleReportGenerated}
            />
          )}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default ManagerDashboard;
