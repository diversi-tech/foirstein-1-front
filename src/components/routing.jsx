import { Route, Routes, HashRouter } from "react-router-dom";
import { Nav } from "./Nav";
import ChangePermission from "./changePermission";
import UserManagementComponent from "./adminEditing";
import ActivityLog from './ActivityLog';
import Login from "./login/login";
import PasswordResetSuccess from "./resetPassword/passwordResetSuccess";
import ResetPassword from "./resetPassword/resetPassword";
import SecurityQuestions from "./resetPassword/securityQuestions";
import Register from "./login/register";
import Profile from "./personalArea/profile";
import ManagerDashboard from "./reports/creatReport";
import ViewReports from "./reports/showReport";
import ReportPage from "./reports/showReport1";
import Charts from "./AllCharts/charts";
import Footer from "./footer";
import PasswordRecovery from "./resetPassword/passwordRecovery";
import '../App.css';
import ProfileForm from "./personalArea/profileForm";
import AccessibilityOptions from "./Accessibility/AccessibilityOptions";
import { AccessibilityProvider } from "./Accessibility/AccessibilityContext";
import { useEffect, useState } from "react";
import { getCookie, getRoleFromToken } from "./decipheringToken";

function ExternalRedirect({ url }) {
  useEffect(() => {
    window.location.href = url;
  }, [url]);
  return null;
}

export const Routing = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie('jwt'));
  const role = isLoggedIn ? getRoleFromToken() : null;

  useEffect(() => {
    setIsLoggedIn(!!getCookie('jwt'));
  }, []);

  return (
    <HashRouter>
      <AccessibilityProvider>
        <nav className="navbar">
          <Nav />
        </nav>
        <div className="content">
          <div className="Accessibility">
            <AccessibilityOptions />
          </div>
          <Routes>
          {!isLoggedIn && (
            <Route path="/" element={<Login/>} />)}
          {isLoggedIn && role=='Admin' &&(
              <Route path="/" element={<ActivityLog />} />)}
          {isLoggedIn && role=='Librarian' && (
             <Route path="/" element={<ExternalRedirect url="https://librarian.foirstein.diversitech.co.il/#/items" />} />    )}     
            <Route path='/search' element={<ExternalRedirect url="https://search.foirstein.diversitech.co.il/#/SearchAppBar" />} />
            <Route path='/search' element={<ExternalRedirect url="https://search.foirstein.diversitech.co.il/#/SearchAppBar" />} />
            {/* <Route path='/search' element={<Login/>} /> */}
            <Route path='/items' element={<ExternalRedirect url="https://librarian.foirstein.diversitech.co.il/#/items" />} />
            <Route path='/itemsPendingApproval' element={<ExternalRedirect url="https://librarian.foirstein.diversitech.co.il/#/itemsPendingApproval" />} />
            <Route path='/studentRequest' element={<ExternalRedirect url="https://librarian.foirstein.diversitech.co.il/#/studentRequest" />} />
            <Route path='/tag-list' element={<ExternalRedirect url="https://librarian.foirstein.diversitech.co.il/#/tag-list" />} />
            <Route path="/items/borrowingItems" element={<ExternalRedirect url="https://librarian.foirstein.diversitech.co.il/#/items/borrowingItems" />} />
            <Route path='/Charts' element={<Charts />} />
            <Route path='/ActivityLog' element={<ActivityLog />} />
            <Route path='/changePermission' element={<ChangePermission />} />
            <Route path='/UserManagementComponent' element={<UserManagementComponent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profileform" element={<ProfileForm />} />
            <Route path="/ManagerDashboard" element={<ManagerDashboard />} />
            <Route path="/view-reports" element={<ViewReports />} />
            <Route path="/report/:reportId" element={<ReportPage />} />
            <Route path="login/register" element={<Register />} />
            <Route path="login/security-question" element={<SecurityQuestions />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
            <Route path="login/security-question/reset-password/password-reset-success/login" element={<Login />} />
            <Route path="/passwordRecovery" element={<PasswordRecovery />} />
            <Route path='/StatusListView' element={<ExternalRedirect url="https://search.foirstein.diversitech.co.il/#/StatusListView" />} />
          </Routes>
          <Footer />
        </div>
      </AccessibilityProvider>
    </HashRouter>
  );
}