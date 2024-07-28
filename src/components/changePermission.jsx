import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, InputAdornment, Checkbox,
  createTheme
} from '@mui/material';
import { Person as PersonIcon, Search as SearchIcon } from '@mui/icons-material';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import theme from '../theme';
import { FillData } from '../redux/actions/userAction';
import userService from '../axios/userAxios';
import ActivityLogService from '../axios/ActivityLogAxios';
import { getUserIdFromTokenid } from './decipheringToken';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const customTheme = (outerTheme) =>
  createTheme({
    direction: 'rtl',
    palette: {
      mode: outerTheme.palette.mode,
    },
  });

const ChangePermission = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.userReducer.userList);
  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [openPermissionsDialog, setOpenPermissionsDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [newPermissions, setNewPermissions] = useState([]);
  const [permissionsData, setPermissionsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const allPermissions = ["Book", "File", "Physical"];

  useEffect(() => {
    userService.getAllUsers()
      .then(response => {
        dispatch(FillData(response));
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    userService.getAllPermissions()
      .then(response => {
        setPermissionsData(response);
      })
      .catch(error => {
        console.error('Error fetching permissions:', error);
      });
  }, [dispatch]);

  const handleRoleChange = (userId, role) => {
    setSelectedUser(users.find(user => user.userId === userId));
    setNewRole(role);
    setOpenRoleDialog(true);
  };

  const handlePermissionsChange = (userId) => {
    const user = users.find(user => user.userId === userId);
    const userPermissions = permissionsData.find(perm => perm.userId === userId)?.permissions || [];
    setSelectedUser(user);
    setNewPermissions(userPermissions);
    setOpenPermissionsDialog(true);
  };

  const confirmRoleChange = () => {
    userService.updateUserRole(selectedUser.userId, newRole)
      .then(response => {
        if (response.success) {
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
    setOpenRoleDialog(false);
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

  const handlePermissionToggle = (permission) => {
    setNewPermissions((prevPermissions) => {
      if (prevPermissions.includes(permission)) {
        return prevPermissions.filter((perm) => perm !== permission);
      } else {
        return [...prevPermissions, permission];
      }
    });
  };

  const filteredUsers = users.filter(user => 
    user.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.tz.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const getUserPermissions = (userId) => {
    const userPermissionsObj = permissionsData.find(permission => permission.userId === userId);
    return userPermissionsObj ? userPermissionsObj.permissions : [];
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={customTheme}>
        <div dir="rtl">
          <Container>
            <Typography variant="h1" align="center">שינוי הרשאות</Typography>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                placeholder="חפש לפי שם משתמש, תעודת זהות או הרשאה"
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
                    <TableCell align="right">שם פרטי</TableCell>
                    <TableCell align="right">תעודת זהות</TableCell>
                    <TableCell align="right">הרשאות נוכחיות</TableCell>
                    <TableCell align="right">פעולות</TableCell>
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
                      <TableCell align="right">{user.fname}</TableCell>
                      <TableCell align="right">{user.tz}</TableCell>
                      <TableCell align="right">
                        <Typography style={{ color: 'red' }}>
                          {user.role === 'Librarian' && getUserPermissions(user.userId).join(', ')}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        {user.role === 'Librarian' && (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handlePermissionsChange(user.userId)}
                          >
                            שנה הרשאות
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Dialog
              open={openRoleDialog}
              onClose={() => setOpenRoleDialog(false)}
              aria-labelledby="role-dialog-title"
              aria-describedby="role-dialog-description"
            >
              <DialogTitle id="role-dialog-title" style={{ fontSize: '24px', color: 'red', textShadow: '1px 1px 2px rgba(255, 0, 0, 0.7)' }}>
                אישור שינוי הרשאה
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="role-dialog-description" style={{ fontSize: '18px', color: 'black', textAlign: 'center' }}>
                  האם אתה בטוח כי ברצונך לשנות ל{selectedUser?.fname} את ההרשאה ל{getRoleNameInHebrew(newRole)}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenRoleDialog(false)} color="primary">
                  ביטול
                </Button>
                <Button onClick={confirmRoleChange} color="primary" autoFocus>
                  אישור
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={openPermissionsDialog}
              onClose={() => setOpenPermissionsDialog(false)}
              aria-labelledby="permissions-dialog-title"
              aria-describedby="permissions-dialog-description"
            >
              <DialogTitle id="permissions-dialog-title">שינוי הרשאות</DialogTitle>
              <DialogContent>
                <DialogContentText id="permissions-dialog-description">
                  סמן את ההרשאות שברצונך להקצות לספרנית:
                </DialogContentText>
                <Box>
                  {allPermissions.map(permission => (
                    <Box key={permission}>
                      <Checkbox
                        checked={newPermissions.includes(permission)}
                        onChange={() => handlePermissionToggle(permission)}
                      />
                      {permission}
                    </Box>
                  ))}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenPermissionsDialog(false)} color="primary">
                  סגור
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ChangePermission;
