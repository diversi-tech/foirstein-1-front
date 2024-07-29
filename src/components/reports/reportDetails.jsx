import React, { useState } from 'react';
import { ThemeProvider, Button, Typography, CssBaseline, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import theme from '../../theme';
import ReportService from '../../axios/reportsAxios';
import { getUserIdFromTokenid, getUserNameFromToken } from '../decipheringToken';
import ActivityLogService from '../../axios/ActivityLogAxios';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
    border: `4px solid ${theme.palette.primary.main}`, // Thick border
    padding: theme.spacing(2),
    width: '500px', // Fixed width
    height: '400px', // Fixed height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  flexGrow: 1,
  marginRight: theme.spacing(1),
  '&:not(:last-child)': {
    marginRight: theme.spacing(2),
  },
}));

const CenteredSnackbar = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  zIndex: 1300,
  backgroundColor: 'green',
  borderRadius: '12px',
  padding: theme.spacing(2),
}));

const IconFrame = styled(ThumbUpAltIcon)(({ theme }) => ({
  fontSize: '4rem', // Smaller icon size
  color: 'white',
  marginRight: theme.spacing(2),
}));

const MessageTypography = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  textAlign: 'center',
  color: 'white',
}));

const ReportDetails = ({ open, handleClose, report, reportNames, setReportNames, onReportGenerated }) => {
  const [reportName, setReportName] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const username = getUserNameFromToken();
  const userid=getUserIdFromTokenid();

  const handleGenerateReport = async () => {
    if (!reportName.trim()) {
      setSnackbarMessage('אנא הזן שם לדו"ח.');
      setOpenSnackbar(true);
      return;
    }

    try {
      let response;
      if (report.title === 'פעילות') {
        debugger
        response = await ReportService.createActivityReport(reportName,userid);
      } else if (report.title === 'חיפושים') {
        response = await ReportService.createSearchLogsReport(reportName,userid);
      } else if (report.title === 'שנתי') {
        debugger
        response = await ReportService.createAnnualReport(reportName,userid);
      } else {
        alert('לא תקין');
        return;
      }

      setSnackbarMessage('נוצר בהצלחה!');
      setOpenSnackbar(true);
      handleClose();
      onReportGenerated();
      const currentUserId = getUserIdFromTokenid();
      const activityLog = {
        LogId: 0,
        UserId: null,
        Activity: 'יצירת דוח',
        Timestamp: new Date(),
        UserId1: currentUserId,
        UserId1NavigationUserId: currentUserId
      };

      ActivityLogService.addActivityLog(activityLog)
        .then(activityResponse => {
          console.log('Activity log added successfully:', activityResponse);
        })
        .catch(activityError => {
          console.error('Error adding activity log:', activityError);
        }); // Call the handler after generating the report
    } catch (error) {
      console.error('שגיאה ביצירת הדו"ח:', error);
      setSnackbarMessage('נכשל ביצירת הדו"ח.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div dir="rtl">
        <CssBaseline />
        <StyledDialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ fontSize: '1.5rem' }}>{report.title}</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom sx={{ fontSize: '1.2rem' }}>
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
                  fontSize: '1.2rem',
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
            <StyledButton
              variant="contained"
              color="primary"
              onClick={handleGenerateReport}
              disabled={!reportName.trim()} // Disable button if reportName is empty
            >
              צור דוח
            </StyledButton>
            <StyledButton onClick={handleClose}>
              ביטול
            </StyledButton>
          </DialogActions>
        </StyledDialog>
        {openSnackbar && (
          <CenteredSnackbar>
            <IconFrame />
            <MessageTypography>
              {snackbarMessage}
            </MessageTypography>
          </CenteredSnackbar>
        )}
      </div>
    </ThemeProvider>
  );
};

export default ReportDetails;
