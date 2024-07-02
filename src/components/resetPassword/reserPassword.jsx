import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Box, Paper, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import userService from '../../axios/userAxios';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [idNumber, setIdNumber] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedIdNumber = localStorage.getItem('idNumber');
        if (storedIdNumber) {
            setIdNumber(storedIdNumber);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('הסיסמאות אינן תואמות');
            return;
        }

        if (newPassword.length < 3) {
            setMessage('הסיסמה חייבת להכיל לפחות 3 תווים');
            return;
        }

        try {
            const data = await userService.changePassword(idNumber, newPassword);
            navigate('/password-reset-success');
        } catch (err) {
            setMessage(err.message);
        }
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const isButtonDisabled = !newPassword || !confirmPassword || newPassword !== confirmPassword;

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom textAlign={'center'}>
                    איפוס סיסמה
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body1" color="textSecondary" textAlign="left">
                            נא להזין את הפרטים הבאים כדי לאפס את הסיסמה שלך:
                        </Typography>
                    </Box>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="newPassword"
                        label="סיסמה חדשה"
                        placeholder="הכנס סיסמה חדשה"
                        type={showPassword ? 'text' : 'password'}
                        id="newPassword"
                        autoComplete="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">א</InputAdornment>,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: { textAlign: 'left' } // כתיבה מתחילה בצד שמאל
                        }}
                        inputProps={{
                            style: { textAlign: 'left' } // כתיבה מתחילה בצד שמאל
                        }}
                        InputLabelProps={{
                            style: { right: 0, left: 'auto', transformOrigin: 'top right', paddingRight: '10px' } // הוספת padding ימני
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="אימות סיסמה"
                        placeholder="אמת סיסמה חדשה"
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">א</InputAdornment>,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: { textAlign: 'left' } // כתיבה מתחילה בצד שמאל
                        }}
                        inputProps={{
                            style: { textAlign: 'left' } // כתיבה מתחילה בצד שמאל
                        }}
                        InputLabelProps={{
                            style: { right: 0, left: 'auto', transformOrigin: 'top right', paddingRight: '10px' } // הוספת padding ימני
                        }}
                    />
                    {message && (
                        <Typography
                            variant="body2"
                            color={message.includes('שגיאה') || message.includes('אינן תואמות') ? 'error' : 'textSecondary'}
                            align="center"
                            sx={{ mt: 2, color: message.includes('שגיאה') || message.includes('אינן תואמות') ? 'error.main' : 'text.secondary' }}
                        >
                            {message}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isButtonDisabled}
                    >
                        איפוס סיסמה
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ResetPassword;
