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
import axios from 'axios';
import theme from '../theme';
import { FillData } from '../redux/actions/userAction';
import userService from '../axios/userAxios';
import ActivityLogService from '../axios/ActivityLogAxios';
import { getUserIdFromTokenid } from './decipheringToken';  // תקן את הנתיב לפי המיקום האמיתי של הקובץ

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
  const [openPermissionsDialog, setOpenPermissionsDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPermissions, setNewPermissions] = useState([]);
  const [permissionsData, setPermissionsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const allPermissions = ["ספר", "קובץ", "פס קול"];

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
    userService.updateUserRole(userId, role)
      .then(response => {
        if (response.success) {
          const updatedUsers = users.map(user =>
            user.userId === userId ? { ...user, role: role } : user
          );
          dispatch(FillData(updatedUsers));

          const currentUserId = getUserIdFromTokenid();
          const activityLog = {
            LogId: 0,
            UserId: users.find(user => user.userId === userId).tz,
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
  };

  const handlePermissionsChange = (userId) => {
    const user = users.find(user => user.userId === userId);
    const userPermissions = permissionsData.find(perm => perm.userId === userId)?.permissions || [];
    setSelectedUser(user);
    setNewPermissions(userPermissions);
    setOpenPermissionsDialog(true);
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

  const confirmPermissionsChange = async () => {
    try {
      const response = await axios.put('https://foirstein-1-back.onrender.com/api/LibrarianPermissions/updatePermissions', {
        userId: selectedUser.userId,
        permissions: newPermissions
      });
      console.log('Response:', response); 
      if (response.data.success) {
        const updatedPermissionsData = permissionsData.map(perm =>
          perm.userId === selectedUser.userId ? { ...perm, permissions: newPermissions } : perm
        );
        setPermissionsData(updatedPermissionsData);
        setOpenPermissionsDialog(false);
      } else {
        alert('Error updating permissions');
      }
    } catch (error) {
      console.error('Error updating permissions:', error);
    }
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

  const translatePermissionToHebrew = (permission) => {
    switch (permission) {
      case "Book":
        return "ספר";
      case "File":
        return "קובץ";
      case "Physical":
        return "פס קול";
      default:
        return permission;
    }
  };

  const translatePermissionToEnglish = (permission) => {
    switch (permission) {
      case "ספר":
        return "Book";
      case "קובץ":
        return "File";
      case "פס קול":
        return "Physical";
      default:
        return permission;
    }
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
                    <TableCell align="right">שם פרטי</TableCell>
                    <TableCell align="right">תעודת זהות</TableCell>
                    <TableCell align="right">הרשאה</TableCell>
                    <TableCell align="right">הרשאות ספרנית</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map(user => (
                    <TableRow key={user.userId}>
                      <TableCell align="right">{user.fname}</TableCell>
                      <TableCell align="right">{user.tz}</TableCell>
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
                      <TableCell align="right">
                        {user.role === 'Librarian' && (
                          <Box
                            sx={{
                              border: '1px solid #ccc',
                              borderRadius: '4px',
                              padding: '8px',
                              cursor: 'pointer'
                            }}
                            onClick={() => handlePermissionsChange(user.userId)}
                          >
                            {getUserPermissions(user.userId).map(perm => translatePermissionToHebrew(perm)).join(', ')}
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Dialog
              open={openPermissionsDialog}
              onClose={() => setOpenPermissionsDialog(false)}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">שינוי הרשאות לספרנית</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  סמן את ההרשאות עבור הספרנית {selectedUser && selectedUser.fname}
                </DialogContentText>
                {allPermissions.map(permission => (
                  <Box key={permission} display="flex" alignItems="center" justifyContent="space-between">
                    <Typography>{permission}</Typography>
                    <Checkbox
                      checked={newPermissions.includes(translatePermissionToEnglish(permission))}
                      onChange={() => handlePermissionToggle(translatePermissionToEnglish(permission))}
                    />
                  </Box>
                ))}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenPermissionsDialog(false)} color="primary">
                  ביטול
                </Button>
                <Button onClick={confirmPermissionsChange} color="primary">
                  אישור
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
