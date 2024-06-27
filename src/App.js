// App.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Path to your general design theme file
import ForgotPassword from './components/forgotPassword';
import AdminPanel from './components/changePermission';
import { Provider } from 'react-redux';
import UserManagementComponent from './components/adminEditing.jsx'
import { store } from './redux/store.jsx';
import { useState, useEffect } from 'react';

function App() {
  return (
   <Provider store={store}>
    <ThemeProvider theme={theme}>
    <div className="App">
      
    </div>
  </ThemeProvider>
   </Provider>
  );
}
export default App;


