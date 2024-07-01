import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Box } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import theme from '../theme';
import { FillData } from '../redux/actions/userAction';
import { getAllUsers, updateUserRole } from '../axios/userAxios';
// -----------------------------------------------------------------------------------------------
const ChangePermission = () => { 
  const dispatch = useDispatch(); 
  const users = useSelector(state => state.userReducer.userList); // קבלת רשימת המשתמשים מה-Redux

  useEffect(() => { 
    getAllUsers() 
      .then(response => { 
        dispatch(FillData(response.data)); 
      })
      .catch(error => { 
        console.error('Error fetching users:', error); 
      });
  }, [dispatch]); 
   // פונקציה לשינוי הרשאה של משתמש
  const handleRoleChange = (userId, newRole) => {
    updateUserRole(userId, newRole) 
      .then(response => { 
        if (response.data.success) {
          dispatch(FillData(users.map(user => user.userId === userId ? { ...user, role: newRole } : user))); // עדכון הנתונים ב-Redux
        } else {
          alert('Error updating role'); 
        }
      })
      .catch(error => { 
        console.error('Error updating role:', error); 
      });
  };
// פונקציה להחזרת אייקון בהתאם להרשאה
  const getIconByRole = (role) => { 
    switch (role) {
      case 'Admin':
        return <GroupsOutlinedIcon fontSize="large" />;
      case 'Student':
        return <PersonIcon fontSize="large" />; 
      case 'Librarian':
        return <PersonAddAltOutlinedIcon fontSize="large" />; 
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}> 
      <Container>
        <Typography variant="h1" align="center">ניהול משתמשים</Typography> 
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>שם משתמש</TableCell> 
                <TableCell>סיסמה</TableCell>
                <TableCell>הרשאה</TableCell> 
                <TableCell></TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => ( 
                <TableRow key={user.userId}> 
                  <TableCell>{user.username}</TableCell> 
                  <TableCell>{user.passwordHash}</TableCell> 
                  <TableCell style={{ width: '200px' }}> 
                    <Box display="flex" alignItems="center"> 
                      <Select
                        value={user.role} 
                        onChange={(e) => handleRoleChange(user.userId, e.target.value)} 
                        style={{ marginRight: 8, flexGrow: 1 }} 
                      >
                        <MenuItem value="Admin">מנהל</MenuItem>
                        <MenuItem value="Student">סטודנט</MenuItem> 
                        <MenuItem value="Librarian">ספרנית</MenuItem> 
                      </Select>
                      {getIconByRole(user.role)} 
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default ChangePermission;