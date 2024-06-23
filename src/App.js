import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Welcome from './component/welcome';
import Logon from './component/Logon';


import './App.css';

const App = () => {
  return (
   
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logon" element={<Logon />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<Login />} /> {/* Redirect to Login by default */}
      </Routes>
    </Router>
  );
};

export default App;
