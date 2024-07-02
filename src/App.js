import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom';
import theme from './theme'; // Path to your general design theme file
import { Provider } from 'react-redux';
import { store } from './redux/store.jsx';
import { useState, useEffect } from 'react';
import { RoutingAdmin } from './components/routingAdmin.jsx';
import PasswordRouting from './components/resetPassword/passwordRouting.jsx'




function App() {
  return (

  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <div className="App">
      <RoutingAdmin />
      <PasswordRouting></PasswordRouting>
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


