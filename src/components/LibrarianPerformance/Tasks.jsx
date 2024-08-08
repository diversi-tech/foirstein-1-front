import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { format } from 'date-fns';
import approvalService from '../../axios/approvalRequestAxios';
import userService from '../../axios/userAxios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Styled components
const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '14px', // Default font size
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  fontSize: '18px', // Larger font size for headers
  fontWeight: 700,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  direction: 'rtl',
  maxWidth: '1200px',
  margin: 'auto',
  position: 'relative', // Ensure that absolute positioning works inside this Paper
}));

const HeaderContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2), // Space below the header
}));

const BackButton = styled(IconButton)(({ theme }) => ({
  marginLeft: 'auto',
}));

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1, // This will center the title
  textAlign: 'center',
}));

const Tasks = () => {
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const librarianName = location.state?.librarianName || 'ספרנית';

  const [tasks, setTasks] = useState([]);
  const [items, setItems] = useState({});
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tasks
        const taskResponse = await approvalService.getAllApprovals();
        
        const filteredTasks = taskResponse.filter(task => task.librariansId == userId);
        const api_url=process.env.REACT_APP_SERVER_URL;

        setTasks(filteredTasks);

        // Fetch item details
        const itemIds = [...new Set(filteredTasks.map(task => task.itemId))];
        debugger
        const itemResponses = await axios.get(`${api_url}/api/Item/GetAllItems`);
        debugger
        
        const itemsMap = itemResponses.data.reduce((acc, item) => {
          acc[item.id] = item.title;
          return acc;
        }, {});
        setItems(itemsMap);

        // Fetch all users data
        
        const userResponse = await userService.getAllUsers();
        
        const usersMap = userResponse.reduce((acc, user) => {
          acc[user.userId] = user.tz;
          return acc;
        }, {});
        setUsers(usersMap);

        setLoading(false);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const calculateTaskDuration = (requestDate, approvalDate) => {
    const request = new Date(requestDate);
    const approval = new Date(approvalDate);
    const duration = approval - request;
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60)) / (1000 * 60));
    return `${days} ימים, ${hours} שעות, ${minutes} דקות`;
  };

  const getStatusText = (status) => {
    if (status === 1) return 'הבקשה אושרה';
    if (status === 0) return 'הבקשה נדחתה';
    return status;
  };

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm');
  };

  if (loading) {
    return (
      <StyledPaper>
        <CircularProgress />
        <Typography variant="h6" gutterBottom>טוען נתונים...</Typography>
      </StyledPaper>
    );
  }

  return (
    <StyledPaper>
      <HeaderContainer>
        <BackButton onClick={() => navigate(-1)} color="primary">
          <ArrowBackIcon style={{ transform: 'rotate(180deg)' }} /> {/* Rotate the arrow to point left */}
        </BackButton>
        <Title variant="h4" gutterBottom>
          ביצועים של {librarianName}
        </Title>
      </HeaderContainer>
      <TableContainer>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableHeaderCell align="right">שם הפריט</StyledTableHeaderCell>
              <StyledTableHeaderCell align="right">ת"ז משתמש</StyledTableHeaderCell>
              <StyledTableHeaderCell align="right">סטטוס בקשה</StyledTableHeaderCell>
              <StyledTableHeaderCell align="right">תאריך הגשת הבקשה</StyledTableHeaderCell>
              <StyledTableHeaderCell align="right">תאריך טיפול בבקשה</StyledTableHeaderCell>
              <StyledTableHeaderCell align="right">זמן ביצוע המשימה</StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.requestId}>
                <StyledTableCell align="right">{items[task.itemId] || 'לא נמצא שם פריט'}</StyledTableCell>
                <StyledTableCell align="right">{users[task.userId] || 'לא נמצא ת"ז משתמש'}</StyledTableCell>
                <StyledTableCell align="right">{getStatusText(task.requestStatus)}</StyledTableCell>
                <StyledTableCell align="right">{formatDate(task.requestDate)}</StyledTableCell>
                <StyledTableCell align="right">{formatDate(task.approvalDate)}</StyledTableCell>
                <StyledTableCell align="right">
                  {calculateTaskDuration(task.requestDate, task.approvalDate)}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </StyledPaper>
  );
};

export default Tasks;




