import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Collapse,
  Box,
  createTheme,
  TablePagination,
} from "@mui/material";
import { ExpandMore, ExpandLess, ChevronLeft, ChevronRight } from "@mui/icons-material";
import "react-datepicker/dist/react-datepicker.css";
import userService from "../axios/userAxios";
import ActivityLogService from "../axios/ActivityLogAxios";
import { FillData } from "../redux/actions/userAction";
import { FillLog } from "../redux/actions/ActivityLogAction";

import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import theme from "../theme";

const ActivityLog = () => {
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.activityLogReducer.activityLogList);
  const users = useSelector((state) => state.userReducer.userList);

  const [usersList, setFusersList] = useState([]);
  const [ActivityLogList, setActivityLogList] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activity, setActivity] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  useEffect(() => {
    fetchUsers();
    fetchLogs();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [logs, usersList]);

  useEffect(() => {
    adjustPagination();
  }, [filteredLogs]);

  const fetchUsers = async () => {
    if (users.length > 0) {
      setFusersList(users);
    } else {
      try {
        const response1 = await userService.getAllUsers();
        setFusersList(response1);
        dispatch(FillData(response1));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  };

  const fetchLogs = async () => {
    if (logs.length > 0) {
      setActivityLogList(logs);
    } else {
      try {
        const response2 = await ActivityLogService.getAllActivityLog();
        setActivityLogList(response2);
        dispatch(FillLog(response2));
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    }
  };

  const handleSearch = () => {
    let filtered = ActivityLogList.filter((log) => {
      const user = usersList.find((user) => user.userId === log.userId1);
      const userNameMatch = user
        ? user.userName.toLowerCase().includes(userName.toLowerCase())
        : false;
      const userIdMatch =
        userId === "" || (user && user.tz.toString().includes(userId));

      let matchUserName = userName.trim() === "" || userNameMatch;
      let matchActivity =
        activity === "" ||
        log.activity.toLowerCase().includes(activity.toLowerCase());

      let matchDateRange = true;
      if (startDate && endDate) {
        const logDate = new Date(log.timestamp).toISOString().split("T")[0];
        matchDateRange = logDate >= startDate && logDate <= endDate;
      }

      return matchUserName && matchActivity && matchDateRange && userIdMatch;
    });

    setFilteredLogs(filtered);
    setPage(0);
  };

  const handleRowToggle = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const adjustPagination = () => {
    const remainder = filteredLogs.length % rowsPerPage;
    if (remainder > 0 && remainder < 3) {
      setRowsPerPage(rowsPerPage - 3 + remainder);
    } else {
      setRowsPerPage(6);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const theme = (outerTheme) =>
    createTheme({
      // direction: "rtl",
      // palette: {
       mode: outerTheme.palette.mode,
        // color:'#0D1E46',
      // },
      palette: {
        primary: {
          main: '#0D1E46',
        },
        secondary: {
          main: '#0D1E46',
        },
        // text: {
        //   primary: '#000000',
        //   secondary: '#FFFFFF',
        // }
        }
    });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
    color:'#0D1E46',
  });

  const Pagination = ({ count, page, rowsPerPage, onChangePage }) => {
    const pages = Math.ceil(count / rowsPerPage);
    const handleClick = (event, value) => {
      onChangePage(event, value);
    };

    const handleBackButtonClick = () => {
      onChangePage(null, page - 1);
    };

    const handleNextButtonClick = () => {
      onChangePage(null, page + 1);
    };

    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 1, flexDirection: 'row-reverse' ,margin:'10px'}}>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          sx={{ mx: 1 }}
        >
          <ChevronLeft />
        </IconButton>
        {Array.from({ length: pages }, (_, index) => (
          <Button
            key={index}
            variant={page === index ? "contained" : "outlined"}
            onClick={(event) => handleClick(event, index)}
            sx={{ minWidth: "40px", mx: 0.5 }}
          >
            {index + 1}
          </Button>
        ))}
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= pages - 1}
          sx={{ mx: 1 }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    );
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", padding: "20px" }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ display: "flex", flexWrap: "wrap" ,"& input": { color: '#0D1E46' }}}
      >
        <Grid item xs={12} sm={6} md={2}>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <div dir="rtl">
                <TextField
                  label="עד תאריך"
                  type="date"
                  variant="outlined"
                  fullWidth
                  onChange={(date) => setEndDate(date.target.value)}
                  selected={endDate}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderColor: '#0D1E46' // צבע מסגרת התיבה
                    },
                    '& .MuiInputLabel-root': {
                      color: '#0D1E46' // צבע התווית
                    }
                  }}                  defaultValue={endDate}
                  InputLabelProps={{
                    shrink: true,
                    // borderColor: '#0D1E46'
                   
                  }}
                />
              </div>
            </ThemeProvider>
          </CacheProvider>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <div dir="rtl">
                <TextField
                  label="מתאריך"
                  type="date"
                  variant="outlined"
                  fullWidth
                  sx={{
                    minWidth: "150px",
                    '& .MuiOutlinedInput-root': { 
                      borderColor: '#0D1E46' // צבע מסגרת התיבה
                    }
                  }}                  
                  defaultValue={startDate}
                  selected={startDate}
                  onChange={(date) => setStartDate(date.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </ThemeProvider>
          </CacheProvider>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <div dir="rtl">
                <TextField
                  label="פעילות"
                  variant="outlined"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  fullWidth
                  sx={{ minWidth: "150px", "& input": { color: '#0D1E46' } }}
                />
              </div>
            </ThemeProvider>
          </CacheProvider>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <div dir="rtl">
                <TextField
                  label="תעודת זהות "
                  variant="outlined"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  fullWidth
                  sx={{ minWidth: "150px", "& input": { color: '#0D1E46' } }}
                />
              </div>
            </ThemeProvider>
          </CacheProvider>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <div dir="rtl">
                <TextField
                  label="שם משתמש"
                  type="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  fullWidth
                  sx={{ minWidth: "150px", "& input": { color: '#0D1E46' } }}
                />
              </div>
            </ThemeProvider>
          </CacheProvider>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center", mt: 2 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ minWidth: "150px", "& input": { color: '#0D1E46' } }}
          >
            חיפוש
          </Button>
        </Grid>
      </Grid>

      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <TableContainer component={Paper} sx={{ mt: 3 }} dir="rtl">
            <Table
              aria-label="activity log table"
              sx={{ minWidth: 650, overflowX: "auto", "& input": { color: '#0D1E46' } }}
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">
                    <Typography variant="body1" fontWeight="bold">
                      תעודת זהות 
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1" fontWeight="bold">
                      שם משתמש
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1" fontWeight="bold">
                      פעילות
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="body1" fontWeight="bold">
                      זמן פעילות
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLogs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((log, index) => {
                    const user = usersList.find(
                      (user) => user.tz === log.userId
                    );
                    return (
                      <React.Fragment key={log.logId}>
                        <TableRow>
                          <TableCell align="center">
                            {page * rowsPerPage + index + 1}
                          </TableCell>
                          <TableCell align="center">
                            {user ? user.tz : "משתמש לא ידוע"}
                          </TableCell>
                          <TableCell align="center">
                            {user ? user.userName : "משתמש לא ידוע"}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              onClick={() =>
                                handleRowToggle(page * rowsPerPage + index)
                              }
                            >
                              {expandedRow === page * rowsPerPage + index ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )}
                            </IconButton>
                            {log.activity.length > 10
                              ? log.activity.substring(0, 10) + "..."
                              : log.activity}
                          </TableCell>
                          <TableCell align="center">
                            {new Date(log.timestamp).toLocaleString()}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            style={{ paddingBottom: 0, paddingTop: 0 }}
                            colSpan={5}
                          >
                            <Collapse
                              
                              in={expandedRow === page * rowsPerPage + index}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Typography variant="body1" sx={{ margin: 2 }}>
                                {log.activity}
                              </Typography>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    );
                  })}
              </TableBody>
            </Table>
            <Pagination
            
              count={filteredLogs.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={handleChangePage}
            />
          </TableContainer>
        </ThemeProvider>
      </CacheProvider>
    </Box>
  );
};

export default ActivityLog;
