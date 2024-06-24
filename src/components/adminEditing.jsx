
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Paper,
  Avatar,
  TextField,
  Button,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import userService from '../axios/userAxios'; // נתיב לקובץ השירות שלך

const UserManagementComponent = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editProfilePicture, setEditProfilePicture] = useState('');
  const [editCreatedAt, setEditCreatedAt] = useState(null);
  const [editUpdatedAt, setEditUpdatedAt] = useState(null);
  const [editPasswordHash, setEditPasswordHash] = useState('');
  const [editRole ,setEditRole] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState('');
  const [newPasswordHash, setNewPasswordHash] = useState('');
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (userId) => {  
    const userToEdit = users.find((user) => user.userId === userId);
    if (userToEdit) {
      setEditUserId(userId);
      setEditUsername(userToEdit.username);
      setEditPasswordHash(userToEdit.passwordHash); 
      setEditEmail(userToEdit.email);
      setEditRole(userToEdit.role);
      setEditProfilePicture(userToEdit.profilePicture);
      setEditCreatedAt(userToEdit.createdAt);
      setEditUpdatedAt(userToEdit.updatedAt);
    }
  };

  const handleSaveEditUser = async () => {
    try {
      const updatedUser = await userService.updateUser({
        userId: editUserId,
        username: editUsername,
        passwordHash: editPasswordHash, // או להוסיף את ה-Hash הנוכחי אם צריך
        email: editEmail,
        role: editRole, // או התפקיד המתאים
        profilePicture: editProfilePicture,
        createdAt: editCreatedAt,
        updatedAt: new Date()
      });

      if (updatedUser) {
        const updatedUsers = users.map((user) =>
          user.userId === editUserId ? updatedUser : user
        );
        setUsers(updatedUsers);
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
  };

  const handleDeleteUser = async (userId) => {
    try {
      await userService.deleteUser(userId);
      const updatedUsers = users.filter((user) => user.userId !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      const newUser = await userService.addUser({
        username: newUsername,
        passwordHash: newPasswordHash,
        email: newEmail,
        role: newRole,
        profilePicture: newProfilePicture,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      setUsers([...users, newUser]);
      setNewUsername('');
      setNewPasswordHash('');
      setNewEmail('');
      setNewProfilePicture('');
      setNewRole('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  // const generatePassword = () => {
  //   const password = Math.random().toString(36).slice(-8);
  //   setNewPasswordHash(password);
  // };
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                User List
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Password</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Profile Picture</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.userId}>
                        <TableCell>{user.userId}</TableCell>
                        <TableCell>
                          {editUserId === user.userId ? (
                            <TextField
                              value={editUsername}
                              onChange={(e) => setEditUsername(e.target.value)}
                            />
                          ) : (
                            user.username
                          )}
                        </TableCell>
                        <TableCell>
                          {editUserId === user.userId ? (
                            <TextField
                              value={editPasswordHash}
                              onChange={(e) => setEditPasswordHash(e.target.value)}
                            />
                          ) : (
                            user.passwordHash
                          )}
                        </TableCell>
                        <TableCell>
                          {editUserId === user.userId ? (
                            <TextField
                              value={editEmail}
                              onChange={(e) => setEditEmail(e.target.value)}
                            />
                          ) : (
                            user.email
                          )}
                        </TableCell>
                        <TableCell>
                          {editUserId === user.userId ? (
                            <TextField
                              value={editRole}
                              onChange={(e) => setEditRole(e.target.value)}
                            />
                          ) : (
                            user.role
                          )}
                        </TableCell>
                        <TableCell>
                           {user.profilePicture ? (
                            <Avatar alt={user.username} src={user.profilePicture} />
                          ) : (
                            <Avatar>{getInitial(user.username)}</Avatar>
                          )}
                        </TableCell>
                        <TableCell>
                          {editUserId === user.userId ? (
                            <>
                              <Button onClick={handleSaveEditUser}>Save</Button>
                              <Button onClick={handleCancelEditUser}>Cancel</Button>
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
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="h6" component="h2" gutterBottom style={{ marginTop: '20px' }}>
                Add New User
              </Typography>
              <TextField
                label="Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                style={{ marginRight: '10px' }}
              />
             <TextField
                label="Password"
                type="password"
                value={newPasswordHash}
                onChange={(e) => setNewPasswordHash(e.target.value)}
                style={{ marginRight: '10px' }}
              />
              {/* <Button onClick={generatePassword}>Generate Password</Button> */}
              <TextField
                label="Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                style={{ marginRight: '10px' }}
              />
              <TextField
                label="Role"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                style={{ marginRight: '10px' }}
              />
              {/* <TextField
                label="Profile Picture"
                value={newProfilePicture}
                onChange={(e) => setNewProfilePicture(e.target.value)}
                style={{ marginRight: '10px' }}
              /> */}
               <Button variant="contained" color="primary" onClick={handleAddUser}>
                Add User
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserManagementComponent;
