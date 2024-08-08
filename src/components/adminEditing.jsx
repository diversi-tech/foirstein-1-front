import { CacheProvider, ThemeProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container, Grid, Card, CardContent, Typography, Table,
  TableContainer, TableHead, TableBody, TableRow, TableCell, IconButton,
  Paper, Avatar, TextField, Button, Collapse,
  Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, InputAdornment,createTheme,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Delete, Edit, ExpandMore, ExpandLess, Visibility, VisibilityOff, Bolt, Search } from '@mui/icons-material';
import userService from '../axios/userAxios';
import { FillData } from '../redux/actions/userAction';
import { getRoleFromToken, getUserIdFromTokenid } from './decipheringToken';
import ActivityLogService from '../axios/ActivityLogAxios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const aleartadd=()=>{
Swal.fire({
  icon: "success",
  title: "נוסף בהצלחה",
  showConfirmButton: false,
  timer: 1500
});
}

const aleartupdate=()=>{
  Swal.fire({
    icon: "success",
    title: "עודכן בהצלחה",
    showConfirmButton: false,
    timer: 1500
  });
  }
  const aleartdell=()=>{
    Swal.fire({
      icon: "success",
      title: "נמחק בהצלחה",
      showConfirmButton: false,
      timer: 1500
    });
    }
const UserManagementComponent = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editUserTz, setEditUserTZ] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editProfilePicture, setEditProfilePicture] = useState('');
  const [editCreatedAt, setEditCreatedAt] = useState(null);
  const [editUpdatedAt, setEditUpdatedAt] = useState(null);
  const [editPasswordHash, setEditPasswordHash] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editPhoneNumber, setEditPhoneNumber] = useState('');
  const [editUserDob, setEditUserDob] = useState('');
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editMegama, setEditMegama] = useState('');
  const [newUserTz, setnewUserTz] = useState(null);
  const [newUserMegama, setnewUserMegama] = useState(null);
  const [newLname, setnewLname] = useState(null);
  const [newFname, setnewFname] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState('');
  const [newPasswordHash, setNewPasswordHash] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newUserDob, setnewUserDob] = useState('');
  const [newPhoneNumber, setnewPhoneNumber] = useState('');
  const [expandedRows, setExpandedRows] = useState({});
  const [isAddUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const roll = getRoleFromToken();
  const navigate=useNavigate();
  const f = useSelector(j => j.userReducer.userList);
  const myDispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      if (f.length > 0) {
        setUsers(f);
        setFilteredUsers(f);
      } else {
        try {
          const data = await userService.getAllUsers();
          setUsers(data);
          setFilteredUsers(data);
          myDispatch(FillData(data));
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    };

    fetchUsers();
  }, [f]);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    filterUsers(query);
  };

  const filterUsers = (query) => {
    const filtered = users.filter(user => 
      user.fname.toLowerCase().includes(query) ||
      user.sname.toLowerCase().includes(query) ||
      user.tz.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phoneNumber.toLowerCase().includes(query) ||
      new Date(user.userDob).toLocaleDateString().toLowerCase().includes(query) ||
      new Date(user.createdAt).toLocaleDateString().toLowerCase().includes(query) ||
      new Date(user.updatedAt).toLocaleDateString().toLowerCase().includes(query) ||
      getRoleInHebrew(user.role).includes(query) ||
      user.megama.toLowerCase().includes(query)
      ||getActivityInHebrew(user.activity).includes(query)
    );
    setFilteredUsers(filtered);
  };

  const handleEditUser = (userId) => {  
    const userToEdit = users.find((user) => user.userId === userId);
    if (userToEdit) {
      setEditUserId(userId);
      setEditUserTZ(userToEdit.tz);
      setEditPasswordHash(userToEdit.passwordHash); 
      setEditEmail(userToEdit.email);
      setEditRole(userToEdit.role);
      setEditProfilePicture(userToEdit.profilePicture);
      setEditCreatedAt(userToEdit.createdAt);
      setEditPhoneNumber(userToEdit.phoneNumber);
      setEditUserDob(userToEdit.userDob);
      setEditFirstName(userToEdit.fname);
      setEditLastName(userToEdit.sname);
      setEditMegama(userToEdit.megama);
      setEditUserDialogOpen(true);
    }
  };

  const handleSaveEditUser = async () => {
    
    try {
      const currentUserId = getUserIdFromTokenid();
      
      const activityLog = {
        
        LogId: 0, 
        UserId: editUserTz,
        Activity: 'עריכת פרטים ע"י מנהל',
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
      const updatedUser = await userService.updateUser({
        userId: editUserId,
        tz:editUserTz,
        fname: editFirstName,
        sname: editLastName,
        passwordHash: editPasswordHash,
        email: editEmail,
        role: editRole,
        profilePicture: editProfilePicture,
        createdAt: editCreatedAt,
        updatedAt: new Date(),
        userDob: editUserDob,
        phoneNumber: editPhoneNumber,
        megama: editMegama
      });

      if (updatedUser) {
        const updatedUsers = users.map((user) =>
          user.userId === editUserId ? updatedUser : user
        );
        setUsers(updatedUsers);
        myDispatch(FillData(users));
        handleCancelEditUser();
        aleartupdate();
      } else {
        console.error('Failed to update user on the server.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancelEditUser = () => {
    setEditUserId(null);
    setEditPasswordHash('');
    setEditEmail('');
    setEditProfilePicture('');
    setEditCreatedAt(null);
    setEditUpdatedAt(null);
    setEditRole('');
    setEditPhoneNumber('');
    setEditUserDob('');
    setEditFirstName('');
    setEditLastName('');
    setEditMegama('');
    setEditUserDialogOpen(false);
  };

  const handleDeleteUser = async () => {
    try {
      
      const currentUserId = getUserIdFromTokenid();
      debugger
      const activityLog = {
        LogId: 0, 
        UserId: null,
        Activity:' '+ users.find(user => user.userId === userIdToDelete).fname+'נמחק מהמערכת',
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
      debugger
      await userService.deleteUser(userIdToDelete);
      const updatedUsers = users.filter((user) => user.userId !== userIdToDelete);
      setUsers(updatedUsers);
      myDispatch(FillData(users));
      setDeleteDialogOpen(false);
      aleartdell();
    } 
    catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUser = async () => {
    
    try {
      const formData = new FormData();
      formData.append('Tz', newUserTz);
      formData.append('Fname', newFname);
      formData.append('Sname', newLname);
      formData.append('PasswordHash', newPasswordHash);
      formData.append('Email', newEmail);
      if (roll === 'Admin')
        formData.append('Role', newRole);
      else
      formData.append('Role', 'Student');
      formData.append('UpdatedAt', new Date().toISOString().split('T')[0]);
      formData.append('UserDob', newUserDob);
      formData.append('PhoneNumber', newPhoneNumber);
      formData.append('Megama', newUserMegama);
      formData.append('ProfilePicture', newProfilePicture);
      const newUser = await userService.addUser(formData);
      aleartadd();
      setUsers([...users, newUser]);
      myDispatch(FillData(users));
      setnewUserMegama('');
      setnewFname('');
      setnewLname('');
      setnewUserTz('');
      setNewPasswordHash('');
      setNewEmail('');
      setNewProfilePicture('');
      setNewRole('');
      setnewPhoneNumber('');
      setnewUserDob('');
      setAddUserDialogOpen(false);

      const currentUserId = getUserIdFromTokenid();
      
      const activityLog = {
        
        LogId: 0, 
        UserId: newUser.tz,
        Activity: 'נוסף למערכת',
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
      console.error('Error adding user:', error);
    }
  };

  const toggleRowExpansion = (userId) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [userId]: !prevExpandedRows[userId],
    }));
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const confirmDeleteUser = (userId) => {
    setUserIdToDelete(userId);
    setDeleteDialogOpen(true);
  };
  const theme = createTheme({
    direction: 'rtl',
    palette: {
      primary: {
        main: '#0D1E46',
      },
      secondary: {
        main: '#B71C1C',
      },
    },
  });

  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const getRoleInHebrew = (role) => {
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
  const getActivityInHebrew = (active) => {
    if(active)
      return 'פעיל';
    return 'לא פעיל' ;
    };
  
  const sortUsers = (users) => {
    const roleOrder = {
      Admin: 1,
      Librarian: 2,
      Student: 3,
    };
  
    return [...filteredUsers].sort((a, b) => {
      if (a.activity === b.activity) {
        return roleOrder[a.role] - roleOrder[b.role];
      }
      return a.activity ? -1 : 1; // פעילים תחילה
    });
  };
  
  
const sortedUsers = sortUsers(users);


  return (
    <Container>
      <div dir='rtl'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
            <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
            <TextField
    label="חיפוש"
    variant="outlined"
    fullWidth
    value={searchQuery}
    onChange={handleSearchChange}
    placeholder="חפש לפי שם, ת.ז., טלפון, תאריך, אימייל וכו'"
    style={{ marginBottom: '20px' }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      ),
    }}
  /></div></ThemeProvider></CacheProvider>
              <Typography variant="h5" component="h2" gutterBottom align="right">
                רשימת משתמשים
              </Typography>
              <Button style={{ float: 'right' }} variant="contained" color="primary" onClick={() => setAddUserDialogOpen(true)}>
                הוסף משתמש
              </Button>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                    <TableCell align="right">#</TableCell>
                    <TableCell align="right">שם משתמש</TableCell>
                    <TableCell align="right">מייל</TableCell>
                    <TableCell align="right">תפקיד</TableCell>
                    <TableCell align="right">תמונת פרופיל</TableCell>
                    <TableCell align="right">סטטוס</TableCell>
                    <TableCell align="right">פעולות</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    
                    {sortedUsers.map((user, index) => (
                      <React.Fragment key={user.userId}>
                        <TableRow>
                        <TableCell align="right">{index + 1}</TableCell>
                        <TableCell align="right">{user.fname}</TableCell>
                        <TableCell align="right">{user.email}</TableCell>
     
                        <TableCell align="right">{getRoleInHebrew(user.role)}</TableCell>
                        <TableCell align="right">
                            <Avatar src={user.profilePicture} alt={user.fname}>
                              {!user.profilePicture && getInitial(user.fname)}
                            </Avatar>
                          </TableCell>
                          <TableCell align="right">
        <Typography style={{ color: user.activity ? 'green' : 'red' }}>
          {user.activity ? 'פעיל' : 'לא פעיל'}
        </Typography>
      </TableCell>
                          <TableCell align="right">
                            <IconButton onClick={() => toggleRowExpansion(user.userId)}>
                              {expandedRows[user.userId] ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                            <IconButton onClick={() => handleEditUser(user.userId)}>
                              <Edit />
                            </IconButton>
                            <IconButton onClick={() => confirmDeleteUser(user.userId)}>
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={expandedRows[user.userId]} timeout="auto" unmountOnExit>
                                <div dir='rtl'>
                                <TableRow>
                           <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={expandedRows[user.userId]} timeout="auto" unmountOnExit>
                               <CardContent>
                                 <Typography variant="h6" fontWeight="bold">פרטים נוספים:</Typography>
                                  <Typography>שם פרטי: {user.fname}</Typography>
                                  <Typography>שם משפחה: {user.sname}</Typography>
                                  <Typography>ת"ז: {user.tz}</Typography>
                               <Typography>נוצר בתאריך: {new Date(user.createdAt).toLocaleDateString()}</Typography>                                 
                               <Typography>עודכן בתאריך: {new Date(user.updatedAt).toLocaleDateString()}</Typography>
                                 <Typography>תאריך לידה: {new Date(user.userDob).toLocaleDateString()}</Typography>
                                 <Typography>טלפון: {user.phoneNumber}</Typography>
                                    <Typography>מגמה : {user.megama}</Typography>
                               </CardContent>
                             </Collapse>
                          </TableCell>
                        </TableRow></div>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onClose={() => setAddUserDialogOpen(false)} maxWidth="md" fullWidth>
  <DialogTitle align="right">הוסף משתמש חדש</DialogTitle>
  <DialogContent>
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <br></br>
              <TextField
                label="אימייל"
                fullWidth
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}> 
              <br></br>
              <TextField
                label="שם פרטי"
                fullWidth
                value={newFname}
                onChange={(e) => setnewFname(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="שם משפחה"
                fullWidth
                value={newLname}
                onChange={(e) => setnewLname(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="תעודת זהות"
                fullWidth
                value={newUserTz}
                onChange={(e) => setnewUserTz(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="מגמה"
                fullWidth
                value={newUserMegama}
                onChange={(e) => setnewUserMegama(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="תאריך לידה"
                fullWidth
                type='date'
                value={newUserDob}
                onChange={(e) => setnewUserDob(e.target.value)}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="מספר טלפון"
                fullWidth
                value={newPhoneNumber}
                onChange={(e) => setnewPhoneNumber(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="סיסמא"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                value={newPasswordHash}
                onChange={(e) => setNewPasswordHash(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordVisibility}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
            </Grid>
            {roll=='Admin' &&(
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
            <InputLabel id="role-label">תפקיד</InputLabel>
          <Select
            label="תפקיד"
            fullWidth
            value={newRole}
            onChange={(e)=>setNewRole(e.target.value)}
            required
          >
            <MenuItem value="Student">סטודנט</MenuItem>
            <MenuItem value="Admin">מנהל</MenuItem>
            <MenuItem value="Librarian">ספרנית</MenuItem>
          </Select></FormControl>
      </Grid>)}
          </Grid>
        </div>
      </ThemeProvider>
    </CacheProvider>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setAddUserDialogOpen(false)} color="primary">
      ביטול
    </Button>
    <Button onClick={handleAddUser} color="primary">
      שמור
    </Button>
  </DialogActions>
</Dialog>
      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onClose={handleCancelEditUser} maxWidth="md" fullWidth>
  <DialogTitle align="right">ערוך משתמש</DialogTitle>
  <DialogContent>
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <br></br>
              <TextField
                label="אימייל"
                fullWidth
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <br></br>
              <TextField
                label="שם פרטי"
                fullWidth
                value={editFirstName}
                onChange={(e) => setEditFirstName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="שם משפחה"
                fullWidth
                value={editLastName}
                onChange={(e) => setEditLastName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="מגמה"
                fullWidth
                value={editMegama}
                onChange={(e) => setEditMegama(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="תאריך לידה"
                fullWidth
                type='date'
                value={editUserDob}
                onChange={(e) => setEditUserDob(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="מספר טלפון"
                fullWidth
                value={editPhoneNumber}
                onChange={(e) => setEditPhoneNumber(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="תמונת פרופיל"
                fullWidth
                value={editProfilePicture}
                onChange={(e) => setEditProfilePicture(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="סיסמא"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                value={editPasswordHash}
                onChange={(e) => setEditPasswordHash(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordVisibility}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    </CacheProvider>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCancelEditUser} color="primary">
      ביטול
    </Button>
    <Button onClick={handleSaveEditUser} color="primary">
      שמור
    </Button>
  </DialogActions>
</Dialog>
      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle align="right">מחיקת משתמש</DialogTitle>
        <DialogContent>
          <Typography align="right">
           ?האם אתה בטוח שברצונך למחוק את המשתמש הזה
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            ביטול
          </Button>
          <Button onClick={handleDeleteUser} color="primary" sx={{ color: 'red' }}>
            מחק
          </Button>
        </DialogActions>
      </Dialog></div>
        </Container>

  );
};

export default UserManagementComponent;
