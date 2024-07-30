
import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom';
import theme from './theme'; // Path to your general design theme file
import { Provider } from 'react-redux';
import { store } from './redux/store.jsx';
import { Routing } from './components/routing.jsx';
import { GlobalStyles } from '@mui/material';
const globalStyles = (
  <GlobalStyles
    styles={{
      '*': {
        fontFamily: 'Rubik, Roboto, "Helvetica Neue", Arial, sans-serif',
      },
    }}
  />
);
function App() {

  return (
    
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <div className="App">
    <CssBaseline />
    {globalStyles}
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


