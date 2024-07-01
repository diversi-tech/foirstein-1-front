// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   TextField,
//   Button,
//   Grid,
//   Typography,
//   IconButton,
//   Collapse,
//   Box,
// } from "@mui/material";
// import { ExpandMore, ExpandLess } from "@mui/icons-material";
// import axios from "axios";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const ActivityLog = () => {
//   const [logs, setLogs] = useState([]);
//   const [filteredLogs, setFilteredLogs] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [userId, setUserId] = useState("");
//   const [username, setUserName] = useState("");
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [activity, setActivity] = useState("");
//   const [expandedRow, setExpandedRow] = useState(null);

//   useEffect(() => {
//     fetchLogs();
//     fetchUsers();
//   }, []);

//   const fetchLogs = () => {
//     axios
    

//       .get("http://localhost:5211/api/ActivityLog/GetAllActivity")
//       .then((response) => {
//         setLogs(response.data);
//         setFilteredLogs(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching logs:", error);
//       });
//   };

//   const fetchUsers = () => {
//     axios
//       .get("http://localhost:5211/api/Users")
//       .then((response) => {
//         setUsers(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching users:", error);
//       });
//   };

//   const handleSearch = () => {
//     let filtered = logs.filter((log) => {
//       const user = users.find((user) => user.userId === log.userId);
//       const userNameMatch = user ? user.username.toLowerCase().includes(username.toLowerCase()) : false;
//       const userIdMatch = userId === "" || (user && user.userId.toString().includes(userId));

//       let matchUserName = username.trim() === "" || userNameMatch;
//       let matchActivity = activity === "" || log.activity.toLowerCase().includes(activity.toLowerCase());

//       let matchDateRange = true;
//       if (startDate && endDate) {
//         matchDateRange =
//           new Date(log.timestamp) >= startDate &&
//           new Date(log.timestamp) <= endDate;
//       }

//       return matchUserName && matchActivity && matchDateRange && userIdMatch;
//     });

//     setFilteredLogs(filtered);
//   };

//   const handleRowToggle = (index) => {
//     setExpandedRow(expandedRow === index ? null : index);
//   };

//   return (
//     <Box sx={{ maxWidth: 1200, margin: 'auto', padding: '20px' }}>
//       <Grid container spacing={2} alignItems="center">
//         <Grid item xs={12} sm={6} md={2}>
//           <TextField
//             label="תעודת זהות משתמש"
//             variant="outlined"
//             value={userId}
//             defaultValue={userId}
//             onChange={(e) => setUserId(e.target.value)}
//             fullWidth
//             sx={{ minWidth: '150px' }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={2}>
//           <TextField
//             label="שם משתמש"
//             variant="outlined"
//             value={username}
//             defaultValue={username}
//             onChange={(e) => setUserName(e.target.value)}
//             fullWidth
//             sx={{ minWidth: '150px' }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={2}>
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             dateFormat="dd/MM/yyyy"
//             customInput={
//               <TextField
//                 label="מתאריך"
//                 variant="outlined"
//                 fullWidth
//                 sx={{ minWidth: '150px' }}
//                 defaultValue={startDate ? startDate.toLocaleDateString() : ''}
//               />
//             }
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={2}>
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             dateFormat="dd/MM/yyyy"
//             customInput={
//               <TextField
//                 label="עד תאריך"
//                 variant="outlined"
//                 fullWidth
//                 sx={{ minWidth: '150px' }}
//                 defaultValue={endDate ? endDate.toLocaleDateString() : ''}
//               />
//             }
//           />

//         </Grid>
//         <Grid item xs={12} sm={6} md={2}>
//           <TextField
//             label="פעילות"
//             variant="outlined"
//             value={activity}
//             defaultValue={activity}
//             onChange={(e) => setActivity(e.target.value)}
//             fullWidth
//             sx={{ minWidth: '150px' }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={2}>
//           <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
//             חיפוש
//           </Button>
//         </Grid>
//       </Grid>

//       <TableContainer component={Paper} sx={{ mt: 3 }}>
//         <Table aria-label="activity log table" sx={{ minWidth: 650, overflowX: 'auto' }}>
//           <TableHead>
//             <TableRow>
//               <TableCell align="center"></TableCell>
//               <TableCell align="center">תעודת זהות משתמש</TableCell>
//               <TableCell align="center">שם משתמש</TableCell>
//               <TableCell align="center">פעילות</TableCell>
//               <TableCell align="center">זמן פעילות</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredLogs.map((log, index) => {
//               const user = users.find((user) => user.userId === log.userId);
//               return (
//                 <React.Fragment key={log.logId}>
//                   <TableRow>
//                     <TableCell align="center">{index + 1}</TableCell>
//                     <TableCell align="center">{user ? user.userId : "Unknown User"}</TableCell>
//                     <TableCell align="center">{user ? user.username : "Unknown User"}</TableCell>
//                     <TableCell align="center">
//                       <IconButton onClick={() => handleRowToggle(index)}>
//                         {expandedRow === index ? <ExpandLess /> : <ExpandMore />}
//                       </IconButton>
//                       {log.activity.length > 10 ? log.activity.substring(0, 10) + "..." : log.activity}
//                     </TableCell>
//                     <TableCell align="center">
//                       {new Date(log.timestamp).toLocaleString()}
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
//                       <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
//                         <Typography variant="body1" sx={{ margin: 2 }}>
//                           {log.activity}
//                         </Typography>
//                       </Collapse>
//                     </TableCell>
//                   </TableRow>
//                 </React.Fragment>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Typography variant="h6" sx={{ padding: '20px', textAlign: 'center' }}>
//         סה"כ שורות: {filteredLogs.length}
//       </Typography>
//     </Box>
//   );
// };

// export default ActivityLog;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";

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
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import userService from "../axios/userAxios";
import ActivityLogService from "../axios/ActivityLogAxios";
import {FillData} from "../redux/actions/userAction";
import { FillLog } from "../redux/actions/ActivityLogAction";



const ActivityLog = () => {
  const dispatch = useDispatch();
  const logs = useSelector(state => state.activityLogReducer.activityLogList);
  const users = useSelector(state => state.userReducer.userList);
  const [usersList, setFusersList] = useState([]);
  const [ActivityLogList, setActivityLogList] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [userId, setUserId] = useState("");
  const [username, setUserName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activity, setActivity] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchLogs();
  }, []);

  useEffect(() => {
    setFilteredLogs(logs);
  }, [logs]);

  const fetchUsers = async () => {
    if(users.length > 0){
      setFusersList(users);
    }
    else{
          try {
      const response = await userService.getAllUsers();
      setFusersList(response);
      dispatch(FillData(usersList));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    }

  };

  const fetchLogs = async () => {
    if(logs.length > 0){
      setActivityLogList(logs);
    }
    else{
      try {
        const response = await ActivityLogService.getAllActivityLog();
        setActivityLogList(response)
        dispatch(FillLog(ActivityLogList));
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    }

  };

  const handleSearch = () => {
    let filtered = ActivityLogList.filter((log) => {
      const user = usersList.find((user) => user.userId === log.userId);
      const userNameMatch = user ? user.username.toLowerCase().includes(username.toLowerCase()) : false;
      const userIdMatch = userId === "" || (user && user.userId.toString().includes(userId));

      let matchUserName = username.trim() === "" || userNameMatch;
      let matchActivity = activity === "" || log.activity.toLowerCase().includes(activity.toLowerCase());

      let matchDateRange = true;
      if (startDate && endDate) {
        matchDateRange =
          new Date(log.timestamp) >= startDate &&
          new Date(log.timestamp) <= endDate;
      }

      return matchUserName && matchActivity && matchDateRange && userIdMatch;
    });

    setFilteredLogs(filtered);
  };

  const handleRowToggle = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: '20px' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="תעודת זהות משתמש"
            variant="outlined"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            fullWidth
            sx={{ minWidth: '150px' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="שם משתמש"
            variant="outlined"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
            sx={{ minWidth: '150px' }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={2}>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            customInput={
              <TextField
                label="עד תאריך"
                variant="outlined"
                fullWidth
                sx={{ minWidth: '150px' }}
                defaultValue={endDate ? endDate.toLocaleDateString() : ''}
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            customInput={
              <TextField
                label="מתאריך"
                variant="outlined"
                fullWidth
                sx={{ minWidth: '150px' }}
                defaultValue={startDate ? startDate.toLocaleDateString() : ''}
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="פעילות"
            id="outlined-basic"
            variant="outlined"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            fullWidth
            sx={{ minWidth: '150px' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
            חיפוש
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table aria-label="activity log table" sx={{ minWidth: 650, overflowX: 'auto' }}>
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">תעודת זהות משתמש</TableCell>
              <TableCell align="center">שם משתמש</TableCell>
              <TableCell align="center">פעילות</TableCell>
              <TableCell align="center">זמן פעילות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs.map((log, index) => {
              const user = users.find((user) => user.userId === log.userId);
              return (
                <React.Fragment key={log.logId}>
                  <TableRow>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{user ? user.userId : "Unknown User"}</TableCell>
                    <TableCell align="center">{user ? user.username : "Unknown User"}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleRowToggle(index)}>
                        {expandedRow === index ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                      {log.activity.length > 10 ? log.activity.substring(0, 10) + "..." : log.activity}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(log.timestamp).toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                      <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
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
      </TableContainer>
      <Typography variant="h6" sx={{ padding: '20px', textAlign: 'center' }}>
        סה"כ שורות: {filteredLogs.length}
      </Typography>
    </Box>
  );
};

export default ActivityLog;
