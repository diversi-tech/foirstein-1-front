// App.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Path to your general design theme file
import ForgotPassword from './components/forgotPassword';
import ActivityLog from './components/ActivityLog';
import { Provider } from 'react-redux';
import {store} from './redux/store';

 // Import the ForgotPassword component

function App() {
  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
    <ActivityLog></ActivityLog>
    </ThemeProvider>
    </Provider>
  );
}

export default App;

