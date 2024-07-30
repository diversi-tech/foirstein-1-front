// import React, { useState } from 'react';
// import { ThemeProvider, Button, Typography, CssBaseline, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
// import theme from '../../theme';
// import ReportService from '../../axios/reportsAxios';
// import { getUserIdFromTokenid, getUserNameFromToken } from '../decipheringToken';
// import ActivityLogService from '../../axios/ActivityLogAxios';
// import { format, parseISO } from 'date-fns';

// const StyledDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialog-paper': {
//     borderRadius: '12px',
//     border: `4px solid ${theme.palette.primary.main}`,
//     padding: theme.spacing(2),
//     width: '500px',
//     height: '400px',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//   },
// }));

// const StyledButton = styled(Button)(({ theme }) => ({
//   flexGrow: 1,
//   marginRight: theme.spacing(1),
//   '&:not(:last-child)': {
//     marginRight: theme.spacing(2),
//   },
// }));

// const CenteredSnackbar = styled(Box)(({ theme }) => ({
//   position: 'fixed',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   flexDirection: 'row',
//   zIndex: 1300,
//   backgroundColor: 'green',
//   borderRadius: '12px',
//   padding: theme.spacing(2),
// }));

// const IconFrame = styled(ThumbUpAltIcon)(({ theme }) => ({
//   fontSize: '4rem',
//   color: 'white',
//   marginRight: theme.spacing(2),
// }));

// const MessageTypography = styled(Typography)(({ theme }) => ({
//   fontSize: '1.5rem',
//   textAlign: 'center',
//   color: 'white',
// }));

// const ReportDetails = ({ open, handleClose, report, reportNames, setReportNames, onReportGenerated }) => {
//   const [reportName, setReportName] = useState('');
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [loginDate, setLoginDate] = useState('');

//   const username = getUserNameFromToken();
//   const userid = getUserIdFromTokenid();

//   const handleGenerateReport = async () => {
//     if (!reportName.trim()) {
//       setSnackbarMessage('אנא הזן שם לדו"ח.');
//       setOpenSnackbar(true);
//       return;
//     }

//     try {
//       let response;
//       if (report.title === 'פעילות') {
//         response = await ReportService.createActivityReport(reportName, userid);
//       } else if (report.title === 'חיפושים') {
//         response = await ReportService.createSearchLogsReport(reportName, userid);
//       } else if (report.title === 'שנתי') {
//         response = await ReportService.createAnnualReport(reportName, userid);
//       } else if (report.title === 'התחברות') {
//         if (!loginDate) {
//           setSnackbarMessage('אנא הזן תאריך התחברות.');
//           setOpenSnackbar(true);
//           return;
//         }
//         // יצירת תאריך מלא עם שעה ברירת מחדל תוך שמירה על אזור הזמן המקומי
//         const fullDate = new Date(`${loginDate}T00:00:00`);
//         const formattedDate = fullDate.toISOString();
//         response = await ReportService.createLoginActivityReport(formattedDate, reportName, userid);
//       } else {
//         alert('לא תקין');
//         return;
//       }

//       setSnackbarMessage('נוצר בהצלחה!');
//       setOpenSnackbar(true);
//       handleClose();
//       onReportGenerated();
//       const currentUserId = getUserIdFromTokenid();
//       const activityLog = {
//         LogId: 0,
//         UserId: null,
//         Activity: 'יצירת דוח',
//         Timestamp: new Date(),
//         UserId1: currentUserId,
//         UserId1NavigationUserId: currentUserId
//       };

//       ActivityLogService.addActivityLog(activityLog)
//         .then(activityResponse => {
//           console.log('Activity log added successfully:', activityResponse);
//         })
//         .catch(activityError => {
//           console.error('Error adding activity log:', activityError);
//         });
//     } catch (error) {
//       console.error('שגיאה ביצירת הדו"ח:', error);
//       setSnackbarMessage('נכשל ביצירת הדו"ח.');
//       setOpenSnackbar(true);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <div dir="rtl">
//         <CssBaseline />
//         <StyledDialog open={open} onClose={handleClose}>
//           <DialogTitle sx={{ fontSize: '1.5rem' }}>{report.title}</DialogTitle>
//           <DialogContent>
//             <Typography variant="body1" gutterBottom sx={{ fontSize: '1.2rem' }}>
//               {report.description}
//             </Typography>
//             <TextField
//               placeholder="הכנס שם דוח"
//               value={reportName}
//               onChange={(e) => setReportName(e.target.value)}
//               fullWidth
//               margin="normal"
//               variant="outlined"
//               required
//               InputProps={{
//                 sx: {
//                   fontSize: '1.2rem',
//                   '& .MuiOutlinedInput-root': {
//                     '&.Mui-focused fieldset': {
//                       borderColor: theme.palette.primary.main,
//                     },
//                   },
//                 },
//               }}
//             />
//             {report.title === 'התחברות' && (
//               <TextField
//                 placeholder="הכנס תאריך התחברות"
//                 value={loginDate}
//                 onChange={(e) => setLoginDate(e.target.value)}
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 required
//                 type="date"
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 InputProps={{
//                   sx: {
//                     fontSize: '1.2rem',
//                     '& .MuiOutlinedInput-root': {
//                       '&.Mui-focused fieldset': {
//                         borderColor: theme.palette.primary.main,
//                       },
//                     },
//                   },
//                 }}
//               />
//             )}
//           </DialogContent>
//           <DialogActions sx={{ justifyContent: 'space-between' }}>
//             <StyledButton
//               variant="contained"
//               color="primary"
//               onClick={handleGenerateReport}
//               disabled={!reportName.trim() || (report.title === 'התחברות' && !loginDate)}
//             >
//               צור דוח
//             </StyledButton>
//             <StyledButton onClick={handleClose}>
//               ביטול
//             </StyledButton>
//           </DialogActions>
//         </StyledDialog>
//         {openSnackbar && (
//           <CenteredSnackbar>
//             <IconFrame />
//             <MessageTypography>
//               {snackbarMessage}
//             </MessageTypography>
//           </CenteredSnackbar>
//         )}
//       </div>
//     </ThemeProvider>
//   );
// };

// export default ReportDetails;
import React, { useState } from 'react';
import { ThemeProvider, Button, Typography, CssBaseline, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import theme from '../../theme';
import ReportService from '../../axios/reportsAxios';
import { getUserIdFromTokenid, getUserNameFromToken } from '../decipheringToken';
import ActivityLogService from '../../axios/ActivityLogAxios';
import { format, parseISO } from 'date-fns';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
    border: `4px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(2),
    width: '500px',
    height: '400px',
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
  fontSize: '4rem',
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
  const [loginDate, setLoginDate] = useState('');
  const [loading, setLoading] = useState(false);

  const username = getUserNameFromToken();
  const userid = getUserIdFromTokenid();

  const handleGenerateReport = async () => {
    if (!reportName.trim()) {
      setSnackbarMessage('אנא הזן שם לדו"ח.');
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);

    try {
      let response;
      if (report.title === 'פעילות') {
        response = await ReportService.createActivityReport(reportName, userid);
      } else if (report.title === 'חיפושים') {
        response = await ReportService.createSearchLogsReport(reportName, userid);
      } else if (report.title === 'שנתי') {
        response = await ReportService.createAnnualReport(reportName, userid);
      } else if (report.title === 'התחברות') {
        if (!loginDate) {
          setSnackbarMessage('אנא הזן תאריך התחברות.');
          setOpenSnackbar(true);
          setLoading(false);
          return;
        }
        const fullDate = new Date(`${loginDate}T00:00:00`);
        const formattedDate = fullDate.toISOString();
        response = await ReportService.createLoginActivityReport(formattedDate, reportName, userid);
      } else {
        alert('לא תקין');
        setLoading(false);
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
        });
    } catch (error) {
      console.error('שגיאה ביצירת הדו"ח:', error);
      setSnackbarMessage('נכשל ביצירת הדו"ח.');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
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
            {report.title === 'התחברות' && (
              <TextField
                placeholder="הכנס תאריך התחברות"
                value={loginDate}
                onChange={(e) => setLoginDate(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                required
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
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
            )}
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={handleGenerateReport}
              disabled={!reportName.trim() || (report.title === 'התחברות' && !loginDate) || loading}
            >
              {loading ? <CircularProgress size={24} /> : 'צור דוח'}
            </StyledButton>
            <StyledButton onClick={handleClose} disabled={loading}>
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
