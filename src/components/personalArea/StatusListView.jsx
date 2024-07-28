import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  CircularProgress,
  Tooltip,
  Button,
  Grid,
  createTheme,
  ThemeProvider,
  Divider,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Backdrop,
  Alert,
  useMediaQuery,
  Collapse,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { FillData } from '../../redux/actions/itemAction';
import stylisRTLPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import RequestDetails from './RequestDetails'; // ייבוא הקומפוננטה
import CloseIcon from '@mui/icons-material/Close';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [stylisRTLPlugin],
});

const theme = createTheme({
  direction: 'rtl',
});

const getStatusIcon = (status, displayType) => {
  switch (status) {
    case 1:
      return displayType === 'icon' ? (
        <Tooltip title="אושר">
          <CheckCircleIcon style={{ color: 'green' }} />
        </Tooltip>
      ) : 'אושר';
    case 2:
      return displayType === 'icon' ? (
        <Tooltip title="נדחה">
          <CancelIcon style={{ color: 'red' }} />
        </Tooltip>
      ) : 'נדחה';
    case 0:
      return displayType === 'icon' ? (
        <Tooltip title="ממתין">
          <HourglassEmptyIcon style={{ color: 'orange' }} />
        </Tooltip>
      ) : 'ממתין';
    default:
      return null;
  }
};

const StatusListView = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const [expandedRequestId, setExpandedRequestId] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('requestId');
  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [error, setError] = useState(null);
  const [showIcons, setShowIcons] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteRequestId, setDeleteRequestId] = useState(null);
  const [closedAlerts, setClosedAlerts] = useState({});
  const currentUser = useSelector(state => state.userReducer.currentUser);
  const itemList = useSelector(state => state.itemReducer.itemList);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [processedRequests, setProcessedRequests] = useState([]);
  const apiUrl = process.env.REACT_APP_SERVER_URL;

  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        //https://foirstein-2-back-lifb.onrender.com/api/BorrowRequest/getBorrowRequestsAndApprovals/17

        const response1 = await fetch(`${apiUrl}/api/BorrowRequest/getBorrowRequestsAndApprovals/${currentUser.UserId}`);
        // const response1 = await fetch( 'https://foirstein-2-back-lifb.onrender.com/api/BorrowRequest/getBorrowRequestsAndApprovals/17');
        const data1 = await response1.json();
        setPendingRequests(data1.borrowRequests);
        setProcessedRequests(data1.borrowApprovalRequests);
        setLoadData(true);  

        const response2 = await fetch(`${apiUrl}/api/BorrowRequest/borrow-requests/${currentUser.UserId}`);
        const data2 = await response2.json();
        dispatch(FillData(data2));
      } catch (error) {
        setError(error);
        setLoadData(false);
      }
    };

    fetchData();
  }, []);

  const refreshRequests = () => {
    setLoading(true);

    setTimeout(() => {
      this.useEffect()
    }, 2000);
  };

  const getStatusDisplay = (status) => {
    return showIcons ? getStatusIcon(status, 'icon') : getStatusIcon(status, 'text');
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/BorrowRequest/Delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      refreshRequests();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleDialogOpen = (requestId) => {
    setDeleteRequestId(requestId);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDeleteRequestId(null);
  };

  const handleConfirmDelete = () => {
    handleDelete(deleteRequestId);
    handleDialogClose();
  };

  const handleExpandClick = (requestId) => {
    setExpandedRequestId(expandedRequestId === requestId ? null : requestId);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAlertClose = (requestId) => {
    setClosedAlerts((prev) => ({ ...prev, [requestId]: true }));
  };

  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const renderAlert = (row) => {
    const currentDate = new Date();
    const untilDate = new Date(row.untilDate);

    if (untilDate < currentDate && !row.isReturned && !closedAlerts[row.requestId]) {
      return (
        <Collapse in={!closedAlerts[row.requestId]}>
          <Alert
            severity="error"
            variant="filled"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => handleAlertClose(row.requestId)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            style={{ marginBottom: '20px', backgroundColor: '#ffcccc', color: '#b20000', direction: 'rtl' }}
          >
            {/* {`התאריך של ההחזרה עבור ${row.productName} עבר! אנא החזר את המוצר בהקדם האפשרי.`} */}
            {`הי, הלו תתעורר! מה קורה פה עוד לא החזרת את${row.productName} `}
            </Alert>
        </Collapse>
      );
    }
    return null;
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8}>
            <Paper elevation={3} style={{ margin: '20px', padding: '20px' }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <IconButton onClick={refreshRequests} aria-label="refresh">
                    {loading ? <CircularProgress size={24} /> : <RefreshIcon />}
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="h6">רשימת בקשות השאלה</Typography>
                </Grid>
              </Grid>
              <Divider variant="middle" style={{ margin: '20px 0' }} />
              {pendingRequests.map((row) => renderAlert(row))}
              <TableContainer component={Paper} sx={{ overflowX: 'hidden' }}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">מחיקת בקשה</TableCell>
                      <TableCell align="center">פרטים נוספים</TableCell>
                      {isMediumScreen && (
                        <>
                          <TableCell align="center">עד תאריך</TableCell>
                          <TableCell align="center">מתאריך</TableCell>
                        </>
                      )}
                      <TableCell align="center">סטטוס</TableCell>
                      <TableCell align="center">מוצר</TableCell>
                      {isSmallScreen && (
                        <TableCell align="center">מספר בקשה</TableCell>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingRequests.map((row) => (
                      <React.Fragment key={row.requestId}>
                        <TableRow>
                          <TableCell align="center">
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDialogOpen(row.requestId)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              onClick={() => handleExpandClick(row.requestId)}
                              aria-label="expand row"
                            >
                              {expandedRequestId === row.requestId ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )}
                            </IconButton>
                          </TableCell>
                          {isMediumScreen && (
                            <>
                              <TableCell align="center">
                                {new Date(row.untilDate).toLocaleDateString('he-IL')}
                              </TableCell>
                              <TableCell align="center">
                                {new Date(row.fromDate).toLocaleDateString('he-IL')}
                              </TableCell>
                            </>
                          )}
                          <TableCell align="center">
                            {getStatusDisplay(row.status)}
                          </TableCell>
                          <TableCell align="center">{row.productName}</TableCell>
                          {isSmallScreen && (
                            <TableCell align="center">{row.requestId}</TableCell>
                          )}
                        </TableRow>
                        {expandedRequestId === row.requestId && (
                          <TableRow>
                            <TableCell colSpan={isMediumScreen ? 7 : 4}>
                              <RequestDetails row={row} />
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                    <TableRow>
                      <TableCell colSpan={isMediumScreen ? 7 : 4} align="center">
                        <Divider />
                      </TableCell>
                    </TableRow>
                    {processedRequests.map((row) => (
                      <React.Fragment key={row.requestId}>
                        <TableRow>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">
                            <IconButton
                              onClick={() => handleExpandClick(row.requestId)}
                              aria-label="expand row"
                            >
                              {expandedRequestId === row.requestId ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )}
                            </IconButton>
                          </TableCell>
                          {isMediumScreen && (
                            <>
                              <TableCell align="center">
                                {new Date(row.untilDate).toLocaleDateString('he-IL')}
                              </TableCell>
                              <TableCell align="center">
                                {new Date(row.fromDate).toLocaleDateString('he-IL')}
                              </TableCell>
                            </>
                          )}
                          <TableCell align="center">
                            {getStatusDisplay(row.status)}
                          </TableCell>
                          <TableCell align="center">{row.productName}</TableCell>
                          {isSmallScreen && (
                            <TableCell align="center">{row.requestId}</TableCell>
                          )}
                        </TableRow>
                        {expandedRequestId === row.requestId && (
                          <TableRow>
                            <TableCell colSpan={isMediumScreen ? 7 : 4}>
                              <RequestDetails row={row} />
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={pendingRequests.length + processedRequests.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Grid>
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>אישור מחיקה</DialogTitle>
          <DialogContent>
            <DialogContentText>
              האם אתה בטוח שברצונך למחוק בקשה זו?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              ביטול
            </Button>
            <Button onClick={handleConfirmDelete} color="primary" autoFocus>
              מחק
            </Button>
          </DialogActions>
        </Dialog>
        <Backdrop open={loading} style={{ zIndex: 1 }}>
          <CircularProgress />
        </Backdrop> 
      </ThemeProvider>
    </CacheProvider>
  );
};

export default StatusListView;

