// App.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Path to your general design theme file
import ForgotPassword from './components/forgotPassword';
import UserManagementComponent from './components/adminEditing.jsx'
import { store } from './redux/store.jsx';
import { Provider } from 'react-redux';
import { useState, useEffect } from 'react';
import { RoutingAdmin } from './components/routingAdmin.jsx';


 // Import the ForgotPassword component

function App() {
  return (
   <Provider store={store}>
    <ThemeProvider theme={theme}>
    <div className="App">
      <RoutingAdmin />
    </div>
  </ThemeProvider>
   </Provider>
  );
}

export default App;

