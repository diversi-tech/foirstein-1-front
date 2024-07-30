import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom';
import theme from './theme'; // Path to your general design theme file
import { Provider } from 'react-redux';
import { store } from './redux/store.jsx';
import { Routing } from './components/routing.jsx';

function App() {

  return (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <div className="App">
      <Routing />     
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


