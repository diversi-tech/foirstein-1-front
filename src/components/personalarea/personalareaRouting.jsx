import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfileForm from './profileform'; // ודא שהנתיב נכון
import Profile from './profile'; // ודא שהנתיב נכון

const PersonalAreaRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/personalarea/profileform" element={<ProfileForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PersonalAreaRouting;

