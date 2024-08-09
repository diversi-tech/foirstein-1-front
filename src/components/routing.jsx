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
import Tasks from "./LibrarianPerformance/Tasks";
import LibrariansTable from "./LibrarianPerformance/LibrariansTable";
import NotFoundPage from "./notFound";
import ServerError from "./ServerError";
import AxiosInterceptorComponent from "../axios/AxiosInterceptorComponent";
import BarcodeScanner from "./BarcodeScanner";


function ExternalRedirect({ url }) {
  useEffect(() => {
    window.location.href = url;
  }, [url]);
  return null;
}

export const Routing = () => {

  const [item, setItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie('jwt'));
  const role = isLoggedIn ? getRoleFromToken() : null;
  const librarians_api="https://librarian.foirstein.diversitech.co.il/#";
  useEffect(() => {
    setIsLoggedIn(!!getCookie('jwt'));
  }, []);

  return (
    <HashRouter>
      <AccessibilityProvider>
      <BarcodeScanner setItem={setItem} />
        <nav className="navbar">
          <Nav />
        </nav>
        <div className="content">
          <div className="Accessibility">
            <AccessibilityOptions />
          </div>
          <AxiosInterceptorComponent />
          <Routes>
          {!isLoggedIn && (
            <Route path="/" element={<Login/>} />)}
          {isLoggedIn && role=='Admin' &&(
              <Route path="/" element={<ActivityLog />} />)}
          {isLoggedIn && role=='Librarian' && (
            <Route path="/" element={<ExternalRedirect url="/items" />} />    )}  
            {isLoggedIn && role=='Student' && (   
            <Route path='/' element={<ExternalRedirect url="https://search.foirstein.diversitech.co.il/#/SearchAppBar" />} />)}
            <Route path='/addBookRequest' element={<ExternalRedirect url="https://search.foirstein.diversitech.co.il/#/addBookRequest" />} />
            <Route path='/search' element={<ExternalRedirect url="https://search.foirstein.diversitech.co.il/#/SearchAppBar" />} />
            <Route path='/SavedItemsScreen' element={<ExternalRedirect url="https://search.foirstein.diversitech.co.il/#/SavedItemsScreen" />} />
            <Route path='/items' element={<ExternalRedirect url="https://librarian.foirstein.diversitech.co.il/#/items" />} />
            <Route path='/itemsPendingApproval' element={<ExternalRedirect url="https://librarian.foirstein.diversitech.co.il/#/itemsPendingApproval" />} />
            <Route path='/studentRequest' element={<ExternalRedirect url="https://librarian.foirstein.diversitech.co.il/#/studentRequest" />} />
            <Route path='/tag-list' element={<ExternalRedirect url="https://librarian.foirstein.diversitech.co.il/#/tag-list" />} />
            <Route path="/items/borrowingItems" element={<ExternalRedirect url="https://librarian.foirstein.diversitech.co.il/#/items/borrowingItems" />} />
            <Route path="/borrowing" element={<ExternalRedirect url="https://librarian.foirstein.diversitech.co.il/#/borrowing" />} />
            <Route path="/returning" element={<ExternalRedirect url="https://librarian.foirstein.diversitech.co.il/#/returning" />} />
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
            <Route path='/LibrariansTable' element={<LibrariansTable />} />
            <Route path="/tasks/:userId" element={<Tasks />} />
            <Route 
  path="/borrow" 
  element={<ExternalRedirect url={`https://search.foirstein.diversitech.co.il/#/borrow?item=${encodeURIComponent(JSON.stringify(item))}`} />} 
/>
            <Route path="server-error" element={<ServerError />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </AccessibilityProvider>
    </HashRouter>
  );
}
