import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Button, Typography, CssBaseline, TextField, Alert, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import theme from '../../theme';
import ReportService from '../../axios/reportsAxios';
import NavBar from './minNav';

const ReportDetails = ({ open, handleClose, report, reportNames, setReportNames }) => {
  const [reportName, setReportName] = useState(reportNames[report.title] || '');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
 
  const handleGenerateReport = async () => {
    if (!reportName.trim()) {
      setSnackbarMessage('אנא הזן שם לדו"ח.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      let response;
      if (report.title === 'פעילות') {
        response = await ReportService.createActivityReport(reportName);
      } else if (report.title === 'חיפושים') {
        response = await ReportService.createSearchLogsReport(reportName);
      } else if (report.title === 'שנתי') {
        response = await ReportService.createAnnualReport(reportName);
      } else {
        alert('לא תקין');
        return;
      }

      setSnackbarMessage('הדו"ח נוצר בהצלחה!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      handleClose(); 
    } catch (error) {
      console.error('שגיאה ביצירת הדו"ח:', error);
      setSnackbarMessage('נכשל ביצירת הדו"ח.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
    <ThemeProvider theme={theme}>
      <div dir="rtl">
        <CssBaseline />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{report.title}</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              {report.description}
            </Typography>
            <TextField
              placeholder="הכנס שם דוח"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              InputProps={{
                sx: {
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                },
              }}
            />
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateReport}
              disabled={!reportName.trim()} // Disable button if reportName is empty
              sx={{ flexGrow: 1, marginRight: '10px' }}
            >
              צור דוח
            </Button>
            <Button
              onClick={handleClose}
              sx={{ flexGrow: 1 }}
            >
              ביטול
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Set the position
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{
            width: '100%',
            fontSize: '1.2rem',
            backgroundColor: snackbarSeverity === 'success' ? 'green' : 'red',
            color: 'white',
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider></div>
  );
};

export default ReportDetails;
