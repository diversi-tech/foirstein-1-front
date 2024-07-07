import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Box } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import theme from '../theme';
import { FillData } from '../redux/actions/userAction';
import userService from '../axios/userAxios';

const ChangePermission = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.userReducer.userList);

  useEffect(() => {
    userService.getAllUsers()
      .then(response => {
        dispatch(FillData(response));
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [dispatch]);

  const handleRoleChange = (userId, newRole) => {
    console.log('Changing role for user:', userId, 'to:', newRole); // Log role change
    userService.updateUserRole(userId, newRole)
      .then(response => {
        if (response.success) {
          debugger
          dispatch(FillData(users.map(user => user.userId === userId ? { ...user, role: newRole } : user)));

        console.log('Role update response:', response); // Log update response
        if (response.succes) {
          const updatedUsers = users.map(user => 
            user.userId === userId ? { ...user, role: newRole } : user
          );
          dispatch(FillData(updatedUsers));

        } else {
          alert('Error updating role');
        }}
  })
      .catch((error) => {
        debugger;
        console.error('Error updating role:', error);
      });
  };

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
                <TableCell align="right">הרשאה</TableCell>
                <TableCell align="right">סיסמה</TableCell>
                <TableCell align="right">שם משתמש</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.userId}>
                  <TableCell align="right" style={{ width: '200px' }}>
                    <Box display="flex" alignItems="center" justifyContent="flex-start">
                      {getIconByRole(user.role)}
                      <Select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.userId, e.target.value)}
                        style={{ marginLeft: 8, flexGrow: 1 }}
                      >
                        <MenuItem value="Admin">מנהל</MenuItem>
                        <MenuItem value="Student">סטודנט</MenuItem>
                        <MenuItem value="Librarian">ספרנית</MenuItem>
                      </Select>
                    </Box>
                  </TableCell>
                  <TableCell align="right">{user.passwordHash}</TableCell>
                  <TableCell align="right">{user.fname}</TableCell>
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
