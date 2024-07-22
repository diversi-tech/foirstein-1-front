import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import userService from '../../axios/userAxios';
import NavBar from '../reports/minNav';
const SecurityQuestions = () => {
    const [idNumber, setIdNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!idNumber) {
            setError('.יש למלא את מספר תעודת הזהות');
            return;
        }
        try {
            const response = await userService.verifyIdNumber(idNumber);
            if (response !== "") {
                navigate('/reset-password');
            } else {
                setError('מספר זהות לא קיים במערכת');
            }
        } catch (err) {
            setError('נכשל בהבאת הנתונים מהשרת.');
        }
    };

    return (
       
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2, textAlign: 'right', direction: 'rtl', width: 'fit-content', maxWidth: '90vw', marginLeft: 'auto' }}>
                <Typography variant="h4" gutterBottom align="right">
                    שאלת אבטחה
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Typography variant="h6" gutterBottom textAlign="right">
                        מהו מספר תעודת הזהות שלך?
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="idNumber"
                        name="idNumber"
                        label="מספר תעודת זהות"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        InputLabelProps={{
                            style: { right: 'unset', left: 'auto', transformOrigin: 'top right', textAlign: 'right', paddingRight: '40px' },
                            shrink: true,
                        }}
                        inputProps={{ style: { textAlign: 'left' } }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    textAlign: 'right',
                                },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        אימות
                    </Button>
                </Box>
                {error && (
                    <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
            </Paper>
        </Container>
    );
};
export default SecurityQuestions;
