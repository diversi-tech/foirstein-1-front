import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { TextField, Button, CssBaseline, Container, Typography } from '@mui/material';
import userService from '../../axios/userAxios';
import { createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { getUserIdFromToken } from '../decipheringToken';


function ProfileForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        userId: '',
        tz: '',
        sname: '',
        passwordHash: '',
        email: '',
        role: '',
        profilePicture: null,
        createdAt: '',
        updatedAt: '',
        userDob: '',
        phoneNumber: '',
        fname: '',
        megama: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userID = getUserIdFromToken();
                if (!userID) return;
                const allUsers = await userService.getAllUsers();
                const currentUser = allUsers.find(user => user.tz === userID);
                if (currentUser) {
                    setState({
                        userId: currentUser.userId || '',
                        tz: currentUser.tz || '',
                        sname: currentUser.sname || '',
                        passwordHash: currentUser.passwordHash||'', // לא נרצה לשים את הסיסמה בטופס
                        email: currentUser.email || '',
                        role: currentUser.role || '',
                        profilePicture: null,
                        createdAt: currentUser.createdAt || '',
                        updatedAt: currentUser.updatedAt || '',
                        userDob: currentUser.userDob || '',
                        phoneNumber: currentUser.phoneNumber || '',
                        fname: currentUser.fname || '',
                        megama: currentUser.megama || ''
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        setState(prevState => ({ ...prevState, profilePicture: e.target.files[0] }));
    };

    const handleSave = async () => {
        try {
            const updatedUser = {
                userId: state.userId,
                tz: state.tz,
                sname: state.sname,
                passwordHash: state.passwordHash,
                email: state.email,
                role: state.role,
                profilePicture: state.profilePicture,
                createdAt: state.createdAt,
                updatedAt: new Date().toISOString(),
                userDob: state.userDob,
                phoneNumber: state.phoneNumber,
                fname: state.fname,
                megama: state.megama
            };

            if (state.profilePicture) {
                const formData = new FormData();
                for (const key in updatedUser) {
                    if (key === 'profilePicture') {
                        formData.append(key, state.profilePicture);
                    } else {
                        formData.append(key, updatedUser[key]);
                    }
                }
                await userService.updateUser(formData);
            } else {
                await userService.updateUser(updatedUser, updatedUser.userId);
            }
            dispatch({ type: 'UPDATE_USER', payload: updatedUser }); // עדכון נתוני המשתמש ב־Redux state
            console.log('User saved successfully');
            alert('המשתמש עודכן בהצלחה');
            // העברה לדף הבית - לאחר השמירה
            navigate('/search')
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const theme = createTheme({
        direction: 'rtl',
        palette: {
            mode: 'light'
        },
    });

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    return (
        <ThemeProvider theme={theme}>
            <CacheProvider value={cacheRtl}>
                <CssBaseline />
                <Container component="main" maxWidth="xs">
                    <Typography component="h1" variant="h5" align="center">
                        עריכת פרטים
                    </Typography>
                    <form dir="rtl">
                      
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="fname"
                            label="שם פרטי"
                            name="fname"
                            value={state.fname}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="sname"
                            label="שם משפחה"
                            name="sname"
                            value={state.sname}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="tz"
                            label="תעודת זהות"
                            name="tz"
                            value={state.tz}
                            disabled
                        />
                        
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="role"
                            label="תפקיד"
                            name="role"
                            value={state.role}
                            disabled
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="phoneNumber"
                            label="טלפון"
                            name="phoneNumber"
                            value={state.phoneNumber}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="userDob"
                            label="תאריך לידה"
                            type="text"
                            value={state.userDob}
                            disabled
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="megama"
                            label="מגמה"
                            name="megama"
                            value={state.megama}
                            onChange={handleChange}
                        />
                        <input
                            type="file"
                            onChange={handleFileChange}
                            style={{ marginTop: '16px', marginBottom: '16px' }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '1rem' }}
                            onClick={handleSave}
                        >
                            שמור
                        </Button>
                    </form>
                </Container>
            </CacheProvider>
        </ThemeProvider>
    );
}

export default ProfileForm;
