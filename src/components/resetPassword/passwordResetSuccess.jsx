import React from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';

const PasswordResetSuccess = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/login'); // עדכן את הקישור לדף ההרשמה שלך
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2, textAlign: 'center' }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'green', mb: 2 }} />
                    <Typography variant="h4" gutterBottom>
                        הסיסמה אופסה בהצלחה
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        הסיסמה שלך אופסה בהצלחה. עכשיו תוכל להתחבר עם הסיסמה החדשה.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRedirect}
                        sx={{ mt: 3 }}
                    >
                        עבור לדף ההתחברות
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default PasswordResetSuccess;
