
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, InputAdornment } from '@mui/material';
import { Person as PersonIcon, Search as SearchIcon } from '@mui/icons-material';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import theme from '../theme';
import { FillData } from '../redux/actions/userAction';
import userService from '../axios/userAxios';
import ActivityLogService from '../axios/ActivityLogAxios';
import { getUserIdFromTokenid } from './decipheringToken';

const ChangePermission = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.userReducer.userList);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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
    setSelectedUser(users.find(user => user.userId === userId));
    setNewRole(newRole);
    setOpen(true);
  };

  const confirmRoleChange = () => {
    userService.updateUserRole(selectedUser.userId, newRole)
      .then(response => {
        if (response.succes) {
          const updatedUsers = users.map(user => 
            user.userId === selectedUser.userId ? { ...user, role: newRole } : user
          );
          dispatch(FillData(updatedUsers));

          const currentUserId = getUserIdFromTokenid();
          const activityLog = {
            LogId: 0, 
            UserId: selectedUser.tz,
            Activity: 'שינוי הרשאה',
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

        } else {
          alert('Error updating role');
        }
      })
      .catch((error) => {
        console.error('Error updating role:', error);
      });
    setOpen(false);
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

  const getRoleNameInHebrew = (role) => {
    switch (role) {
      case 'Admin':
        return 'מנהל';
      case 'Student':
        return 'סטודנט';
      case 'Librarian':
        return 'ספרנית';
      default:
        return role;
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.passwordHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.tz.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h1" align="center">שינוי הרשאות</Typography>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            placeholder="חפש לפי שם משתמש, סיסמה, תעודת זהות או הרשאה"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">הרשאה</TableCell>
                <TableCell align="right">סיסמה</TableCell>
                <TableCell align="right">שם פרטי</TableCell>
                <TableCell align="right">תעודת זהות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map(user => (
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
                  <TableCell align="right">{user.tz}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ fontSize: '24px', color: 'red', textShadow: '1px 1px 2px rgba(255, 0, 0, 0.7)' }}>אישור שינוי הרשאה</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{ fontSize: '18px', color: 'black', textAlign: 'center' }}>
              האם אתה בטוח כי ברצונך לשנות ל{selectedUser?.fname} את ההרשאה ל{getRoleNameInHebrew(newRole)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              ביטול
            </Button>
            <Button onClick={confirmRoleChange} color="primary" autoFocus>
              אישור
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default ChangePermission;
