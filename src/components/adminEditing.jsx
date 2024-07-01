
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,Grid,Card,CardContent,Typography,Table,
  TableContainer,TableHead,TableBody,TableRow,TableCell,IconButton,
  Paper,Avatar,TextField,Button,Collapse,
  Dialog, DialogActions,DialogContent,DialogTitle, MenuItem, InputAdornment
} from '@mui/material';
import { Delete, Edit, ExpandMore, ExpandLess, Visibility, VisibilityOff, Bolt } from '@mui/icons-material';
import userService from '../axios/userAxios';
import { FillData } from '../redux/actions/userAction';

const UserManagementComponent = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editProfilePicture, setEditProfilePicture] = useState('');
  const [editCreatedAt, setEditCreatedAt] = useState(null);
  const [editUpdatedAt, setEditUpdatedAt] = useState(null);
  const [editPasswordHash, setEditPasswordHash] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editphoneNumber, setEditphoneNumber] = useState('');
  const [edituserDob, setEdituserDob] = useState('');
  const [newUserId, setnewUserId] = useState(null);
  const [newUsername, setNewUsername] = useState('');
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

  const f = useSelector(j => j.userReducer.userList);
  const myDispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      if (f.length > 0) {
        setUsers(f);
      } else {
        try {
          const data = await userService.getAllUsers();
          setUsers(data);
          myDispatch(FillData(data));
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    };

    fetchUsers();
  }, [f]);

  const handleEditUser = (userId) => {  
    const userToEdit = users.find((user) => user.userId === userId);
    if (userToEdit) {
      setEditUserId(userId);
      setEditUsername(userToEdit.userName);
      setEditPasswordHash(userToEdit.passwordHash); 
      setEditEmail(userToEdit.email);
      setEditRole(userToEdit.role);
      setEditProfilePicture(userToEdit.profilePicture);
      setEditCreatedAt(userToEdit.createdAt);
      setEditUpdatedAt(userToEdit.updatedAt);
      setEditphoneNumber(userToEdit.phoneNumber);
      setEdituserDob(userToEdit.userDob);
      setEditUserDialogOpen(true);
    }
  };

  const handleSaveEditUser = async () => {
    try {
      const updatedUser = await userService.updateUser({
        userId: editUserId,
        userName: editUsername,
        passwordHash: editPasswordHash,
        email: editEmail,
        role: editRole,
        profilePicture: editProfilePicture,
        createdAt: editCreatedAt,
        updatedAt: new Date(),
        userDob: edituserDob,
        phoneNumber: editphoneNumber
      });

      if (updatedUser) {
        const updatedUsers = users.map((user) =>
          user.userId === editUserId ? updatedUser : user
        );
        setUsers(updatedUsers);
        myDispatch(FillData(users));
        handleCancelEditUser();
      } else {
        console.error('Failed to update user on the server.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancelEditUser = () => {
    setEditUserId(null);
    setEditUsername('');
    setEditPasswordHash('');
    setEditEmail('');
    setEditProfilePicture('');
    setEditCreatedAt(null);
    setEditUpdatedAt(null);
    setEditRole('');
    setEditphoneNumber('');
    setEdituserDob('');
    setEditUserDialogOpen(false);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await userService.deleteUser(userId);
      const updatedUsers = users.filter((user) => user.userId !== userId);
      setUsers(updatedUsers);
      myDispatch(FillData(users));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      const newUser = await userService.addUser({
        userId: newUserId,
        userName: newUsername,
        passwordHash: newPasswordHash,
        email: newEmail,
        role: newRole,
        profilePicture: newProfilePicture,
        createdAt: new Date(),
        updatedAt: new Date(),
        phoneNumber: newPhoneNumber,
        userDob: newUserDob
      });

      setUsers([...users, newUser]);
      myDispatch(FillData(users));
      setNewUsername('');
      setNewPasswordHash('');
      setNewEmail('');
      setNewProfilePicture('');
      setNewRole('');
      setnewPhoneNumber('');
      setnewUserDob('');
      setAddUserDialogOpen(false);
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

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
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
                      <TableCell align="right">פעולות</TableCell>
                      <TableCell align="right">תמונת פרופיל</TableCell>
                      <TableCell align="right">תפקיד</TableCell>
                      <TableCell align="right">מייל</TableCell>
                      <TableCell align="right">שם משתמש</TableCell>
                      <TableCell align="right">#</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user,index) => (
                      <React.Fragment key={user.userId}>
                        <TableRow>
                          <TableCell align="right">
                            {editUserId === user.userId ? (
                              <>
                                <Button onClick={handleSaveEditUser}>שמור</Button>
                                <Button onClick={handleCancelEditUser}>בטל</Button>
                              </>
                            ) : (
                              <>
                                <IconButton
                                  edge="end"
                                  aria-label="edit"
                                  onClick={() => handleEditUser(user.userId)}
                                >
                                  <Edit />
                                </IconButton>
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  onClick={() => handleDeleteUser(user.userId)}
                                >
                                  <Delete />
                                </IconButton>
                                <IconButton
                                  edge="end"
                                  aria-label="expand"
                                  onClick={() => toggleRowExpansion(user.userId)}
                                >
                                  {expandedRows[user.userId] ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                              </>
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {user.profilePicture ? (
                              <Avatar alt={user.userName} src={user.profilePicture} />
                            ) : (
                              <Avatar>{getInitial(user.userName)}</Avatar>
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {editUserId === user.userId ? (
                              <TextField
                                select
                                value={editRole}
                                onChange={(e) => setEditRole(e.target.value)}
                                label="תפקיד"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                              >
                                <MenuItem value="Student">Student</MenuItem>
                                <MenuItem value="Liberian">Liberian</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                              </TextField>
                            ) : (
                              user.role
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {editUserId === user.userId ? (
                              <TextField
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                                label="מייל"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                              />
                            ) : (
                              user.email
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {editUserId === user.userId ? (
                              <TextField
                                value={editUsername}
                                onChange={(e) => setEditUsername(e.target.value)}
                                label="שם משתמש"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                              />
                            ) : (
                              user.userName
                            )}
                          </TableCell>
                          <TableCell align="right">{index + 1}</TableCell>
                        </TableRow>
                        {expandedRows[user.userId] && (
                          <TableRow>
                            <TableCell colSpan={6}>
                              <Collapse in={expandedRows[user.userId]}>
                                <div>
                                  <Typography textAlign={'right'} variant="subtitle1">
                                    ת"ז: {user.userId}
                                  </Typography>
                                  <Typography variant="subtitle1" textAlign={'right'}>
                                    תאריך הרשמה: {new Date(user.createdAt).toLocaleDateString()}
                                  </Typography>
                                  <Typography variant="subtitle1" textAlign={'right'}>
                                    תאריך עריכה: {new Date(user.updatedAt).toLocaleDateString()}
                                  </Typography>
                                  <Typography variant="subtitle1" textAlign={'right'}>
                                    תאריך לידה: {new Date(user.userDob).toLocaleDateString()}
                                  </Typography>
                                  <Typography variant="subtitle1" textAlign={'right'}>
                                    מספר טלפון: {user.phoneNumber}
                                  </Typography>
                                  <Typography variant="subtitle1" textAlign={'right'}>
                                    סיסמא:
                                    {showPassword ? user.passwordHash : '********'}
                                    <IconButton onClick={handlePasswordVisibility}>
                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </Typography>
                                </div>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={isAddUserDialogOpen} onClose={() => setAddUserDialogOpen(false)}>
        <DialogTitle>הוסף משתמש</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            placeholder='הכנס תעודת זהות'
            label="תעודת זהות"
            type="text"
            fullWidth
            value={newUserId}
            onChange={(e) => setnewUserId(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            placeholder='הכנס שם משתמש'
            label="שם משתמש"
            type="text"
            fullWidth
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            placeholder='הכנס  כתובת מייל'
            label="מייל"
            type="email"
            fullWidth
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            placeholder='הכנס סיסמא'
            label="סיסמא"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={newPasswordHash}
            onChange={(e) => setNewPasswordHash(e.target.value)}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handlePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            select
            margin="dense"
            placeholder='בחר תפקיד'
            label="תפקיד"
            fullWidth
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Liberian">Liberian</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            label="מספר טלפון"
            placeholder="הכנס מספר טלפון "
            type="text"
            fullWidth
            value={newPhoneNumber}
            onChange={(e) => setnewPhoneNumber(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="תאריך לידה"
            type="date"
            placeholder="הכנס תאריך לידה"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={newUserDob}
            onChange={(e) => setnewUserDob(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddUserDialogOpen(false)} color="primary">
            בטל
          </Button>
          <Button onClick={handleAddUser} color="primary">
            הוסף
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isEditUserDialogOpen} onClose={handleCancelEditUser}>
        <DialogTitle>ערוך משתמש</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="שם משתמש"
            type="text"
            fullWidth
            value={editUsername}
            onChange={(e) => setEditUsername(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="מייל"
            type="email"
            fullWidth
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="סיסמא"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={editPasswordHash}
            onChange={(e) => setEditPasswordHash(e.target.value)}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handlePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            select
            margin="dense"
            label="תפקיד"
            fullWidth
            value={editRole}
            onChange={(e) => setEditRole(e.target.value)}
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Liberian">Liberian</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            label="מספר טלפון"
            placeholder="הכנס מספר טלפון "
            type="text"
            fullWidth
            value={editphoneNumber}
            onChange={(e) => setEditphoneNumber(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="תאריך לידה"
            type="date"
            placeholder="הכנס תאריך לידה"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={edituserDob}
            onChange={(e) => setEdituserDob(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEditUser} color="primary">
            בטל
          </Button>
          <Button onClick={handleSaveEditUser} color="primary">
            שמור
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserManagementComponent;
