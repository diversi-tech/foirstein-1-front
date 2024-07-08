// components/routingAdmin.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminNav } from "./adminNav";
import ChangePermission from "./changePermission";
import UserManagementComponent from "./adminEditing";
import ActivityLog from './ActivityLog';
import Profile from './personalarea/profile';
import ProfileForm from './personalarea/profileform';

const RoutingAdmin = () => {
    return (
        <BrowserRouter>
            <AdminNav />
            <Routes>
                <Route path='/ActivityLog' element={<ActivityLog />} />
                <Route path='/changePermission' element={<ChangePermission />} />
                <Route path='/UserManagementComponent' element={<UserManagementComponent />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profileform" element={<ProfileForm />} />

            </Routes>
        </BrowserRouter>
    );
};

export { RoutingAdmin };
export default RoutingAdmin;
