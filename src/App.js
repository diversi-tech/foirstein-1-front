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


function App() {
  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
   
  <PasswordRouting></PasswordRouting>     

  </ThemeProvider></Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


export default App;


