import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import theme from './theme';

import SecurityQuestions from './components/securityQuestions';
import ResetPassword from './components/reserPassword';
import PasswordRouting from './components/passwordRouting';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import theme from './theme'; // Path to your general design theme file
import ForgotPassword from './components/forgotPassword';
import AdminPanel from './components/changePermission';
import { Provider } from 'react-redux';
import UserManagementComponent from './components/adminEditing.jsx'
import { store } from './redux/store.jsx';
import { useState, useEffect } from 'react';
import ChangePermission from './components/changePermission';
import { RoutingAdmin } from './components/routingAdmin.jsx';



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

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



export default App;


