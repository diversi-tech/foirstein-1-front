// App.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Path to your general design theme file
import ForgotPassword from './components/forgotPassword';
 // Import the ForgotPassword component

function App() {
  return (
    <ThemeProvider theme={theme}>
    
    </ThemeProvider>
  );
}

export default App;

