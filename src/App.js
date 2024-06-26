// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Register from './component/Register';
import Login from './component/Login';




const App = () => {
  return (
    <Router>
      <Routes>
     
        <Route path="/home" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
