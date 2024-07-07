import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

import ReactDOM from 'react-dom';

import theme from './theme'; // Path to your general design theme file
import { Provider } from 'react-redux';
import { store } from './redux/store.jsx';
import { RoutingAdmin } from './components/routingAdmin.jsx';
import PasswordRouting from './components/resetPassword/passwordRouting.jsx'
import LoginRouting from './components/login/loginRouting.jsx';



function App() {
  return (

  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <div className="App">
      <PasswordRouting></PasswordRouting>  
      <RoutingAdmin />
      <LoginRouting></LoginRouting>
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


