
// import React, { useState } from 'react';
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Table,
//   TableContainer,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   IconButton,
//   Paper,
//   Avatar,
//   TextField,
//   Button,
// } from '@mui/material';
// import { Delete, Edit } from '@mui/icons-material';

// const UserManagementComponent = () => {
//   const [users, setUsers] = useState([
//     {
//       UserId: 1,
//       Username: 'john_doe',
//       Email: 'john.doe@example.com',
//       Role: 'user',
//       ProfilePicture: 'https://via.placeholder.com/150',
//       CreatedAt: new Date('2023-01-01'),
//       UpdatedAt: new Date('2023-06-01'),
//     },
//     {
//       UserId: 2,
//       Username: 'jane_smith',
//       Email: 'jane.smith@example.com',
//       Role: 'admin',
//       ProfilePicture: 'https://via.placeholder.com/150',
//       CreatedAt: new Date('2023-01-15'),
//       UpdatedAt: new Date('2023-06-10'),
//     },
//   ]);

//   const [editUserId, setEditUserId] = useState(null);
//   const [editUsername, setEditUsername] = useState('');
//   const [editEmail, setEditEmail] = useState('');
//   const [editProfilePicture, setEditProfilePicture] = useState('');
//   const [editCreatedAt, setEditCreatedAt] = useState(null);
//   const [editUpdatedAt, setEditUpdatedAt] = useState(null);

//   const handleEditUser = (userId) => {
//     const userToEdit = users.find((user) => user.UserId === userId);
//     if (userToEdit) {
//       setEditUserId(userId);
//       setEditUsername(userToEdit.Username);
//       setEditEmail(userToEdit.Email);
//       setEditProfilePicture(userToEdit.ProfilePicture);
//       setEditCreatedAt(userToEdit.CreatedAt);
//       setEditUpdatedAt(userToEdit.UpdatedAt);
//     }
//   };

//   const handleSaveEditUser = () => {
//     const updatedUsers = users.map((user) =>
//       user.UserId === editUserId
//         ? {
//             ...user,
//             Username: editUsername,
//             Email: editEmail,
//             ProfilePicture: editProfilePicture,
//             UpdatedAt: new Date(),
//           }
//         : user
//     );
//     setUsers(updatedUsers);
//     setEditUserId(null);
//     setEditUsername('');
//     setEditEmail('');
//     setEditProfilePicture('');
//     setEditCreatedAt(null);
//     setEditUpdatedAt(null);
//   };

//   const handleCancelEditUser = () => {
//     setEditUserId(null);
//     setEditUsername('');
//     setEditEmail('');
//     setEditProfilePicture('');
//     setEditCreatedAt(null);
//     setEditUpdatedAt(null);
//   };

//   const handleDeleteUser = (userId) => {
//     const updatedUsers = users.filter((user) => user.UserId !== userId);
//     setUsers(updatedUsers);
//   };

//   return (
//     <Container>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h5" component="h2" gutterBottom>
//                 User List
//               </Typography>
//               <TableContainer component={Paper}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>ID</TableCell>
//                       <TableCell>Username</TableCell>
//                       <TableCell>Email</TableCell>
//                       <TableCell>Role</TableCell>
//                       <TableCell>Profile Picture</TableCell>
//                       <TableCell>Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {users.map((user) => (
//                       <TableRow key={user.UserId}>
//                         <TableCell>{user.UserId}</TableCell>
//                         <TableCell>{user.Username}</TableCell>
//                         <TableCell>{user.Email}</TableCell>
//                         <TableCell>{user.Role}</TableCell>
//                         <TableCell>
//                           <Avatar alt={user.Username} src={user.ProfilePicture} />
//                         </TableCell>
//                         <TableCell>
//                           {editUserId === user.UserId ? (
//                             <>
//                               <TextField
//                                 label="Username"
//                                 value={editUsername}
//                                 onChange={(e) => setEditUsername(e.target.value)}
//                               />
//                               <TextField
//                                 label="Email"
//                                 value={editEmail}
//                                 onChange={(e) => setEditEmail(e.target.value)}
//                               />
//                               <TextField
//                                 label="Profile Picture"
//                                 value={editProfilePicture}
//                                 onChange={(e) => setEditProfilePicture(e.target.value)}
//                               />
//                               <Button onClick={handleSaveEditUser}>Save</Button>
//                               <Button onClick={handleCancelEditUser}>Cancel</Button>
//                             </>
//                           ) : (
//                             <>
//                               <IconButton
//                                 edge="end"
//                                 aria-label="edit"
//                                 onClick={() => handleEditUser(user.UserId)}
//                               >
//                                 <Edit />
//                               </IconButton>
//                               <IconButton
//                                 edge="end"
//                                 aria-label="delete"
//                                 onClick={() => handleDeleteUser(user.UserId)}
//                               >
//                                 <Delete />
//                               </IconButton>
//                             </>
//                           )}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default UserManagementComponent;
import React, { useState } from 'react';
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

const UserManagementComponent = () => {
  const [users, setUsers] = useState([
    {
      UserId: 1,
      Username: 'john_doe',
      Email: 'john.doe@example.com',
      Role: 'user',
      ProfilePicture: 'https://via.placeholder.com/150',
      CreatedAt: new Date('2023-01-01'),
      UpdatedAt: new Date('2023-06-01'),
    },
    {
      UserId: 2,
      Username: 'jane_smith',
      Email: 'jane.smith@example.com',
      Role: 'admin',
      ProfilePicture: 'https://via.placeholder.com/150',
      CreatedAt: new Date('2023-01-15'),
      UpdatedAt: new Date('2023-06-10'),
    },
  ]);

  const [editUserId, setEditUserId] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editProfilePicture, setEditProfilePicture] = useState('');
  const [editCreatedAt, setEditCreatedAt] = useState(null);
  const [editUpdatedAt, setEditUpdatedAt] = useState(null);

  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState('');

  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user.UserId === userId);
    if (userToEdit) {
      setEditUserId(userId);
      setEditUsername(userToEdit.Username);
      setEditEmail(userToEdit.Email);
      setEditProfilePicture(userToEdit.ProfilePicture);
      setEditCreatedAt(userToEdit.CreatedAt);
      setEditUpdatedAt(userToEdit.UpdatedAt);
    }
  };

  const handleSaveEditUser = () => {
    const updatedUsers = users.map((user) =>
      user.UserId === editUserId
        ? {
            ...user,
            Username: editUsername,
            Email: editEmail,
            ProfilePicture: editProfilePicture,
            UpdatedAt: new Date(),
          }
        : user
    );
    setUsers(updatedUsers);
    setEditUserId(null);
    setEditUsername('');
    setEditEmail('');
    setEditProfilePicture('');
    setEditCreatedAt(null);
    setEditUpdatedAt(null);
  };

  const handleCancelEditUser = () => {
    setEditUserId(null);
    setEditUsername('');
    setEditEmail('');
    setEditProfilePicture('');
    setEditCreatedAt(null);
    setEditUpdatedAt(null);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.UserId !== userId);
    setUsers(updatedUsers);
  };

  const handleAddUser = () => {
    const newUser = {
      UserId: users.length + 1,
      Username: newUsername,
      Email: newEmail,
      Role: 'user',
      ProfilePicture: newProfilePicture,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    };
    setUsers([...users, newUser]);
    setNewUsername('');
    setNewEmail('');
    setNewProfilePicture('');
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
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Profile Picture</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.UserId}>
                        <TableCell>{user.UserId}</TableCell>
                        <TableCell>{user.Username}</TableCell>
                        <TableCell>{user.Email}</TableCell>
                        <TableCell>{user.Role}</TableCell>
                        <TableCell>
                          <Avatar alt={user.Username} src={user.ProfilePicture} />
                        </TableCell>
                        <TableCell>
                          {editUserId === user.UserId ? (
                            <>
                              <TextField
                                label="Username"
                                value={editUsername}
                                onChange={(e) => setEditUsername(e.target.value)}
                              />
                              <TextField
                                label="Email"
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                              />
                              <TextField
                                label="Profile Picture"
                                value={editProfilePicture}
                                onChange={(e) => setEditProfilePicture(e.target.value)}
                              />
                              <Button onClick={handleSaveEditUser}>Save</Button>
                              <Button onClick={handleCancelEditUser}>Cancel</Button>
                            </>
                          ) : (
                            <>
                              <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={() => handleEditUser(user.UserId)}
                              >
                                <Edit />
                              </IconButton>
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleDeleteUser(user.UserId)}
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
                label="Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                style={{ marginRight: '10px' }}
              />
              <TextField
                label="Profile Picture"
                value={newProfilePicture}
                onChange={(e) => setNewProfilePicture(e.target.value)}
                style={{ marginRight: '10px' }}
              />
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

