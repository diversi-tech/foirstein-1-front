import { BrowserRouter,Route,Routes,HashRouter } from "react-router-dom"
import { Nav } from "./Nav"
import  ChangePermission  from "./changePermission"
// import { Charts } from "./Charts"
import UserManagementComponent from "./adminEditing"
import ActivityLog from './ActivityLog'
import Login from "./login/login"
import PasswordResetSuccess from "./resetPassword/passwordResetSuccess"
import ResetPassword from "./resetPassword/reserPassword"
import SecurityQuestions from "./resetPassword/securityQuestions"
import Register from "./login/register"
import Profile from "./personalArea/profile"
import ManagerDashboard from "./reports/creatReport"
import ViewReports from "./reports/showReport"
import ReportPage from "./reports/showReport1"
import NavBar from "./reports/minNav"
import Charts from "./AllCharts/charts"
import ActivityChart from "./AllCharts/ActivityChart "
import Footer from "../components/footer";
import { Home } from "./login/home"
import PasswordRecovery from "./resetPassword/passwordRecovery"
import '../App.css';
import ProfileForm from "./personalArea/profileForm"
import AccessibilityOptions from "./Accessibility/AccessibilityOptions"
import { AccessibilityProvider } from "./Accessibility/AccessibilityContext"
import { position } from "stylis"


export const Routing=()=>{
    return <HashRouter>
      
      <AccessibilityProvider>
       <nav className="navbar">
          <Nav />
        </nav> 
        <div className="content">
          <div className="Accessibility">
        <AccessibilityOptions /> 
        </div>
        
    <Routes>
      
     <Route path='/' element={<Home></Home>}></Route>
     <Route path='/home' element={<Home></Home>}></Route>
     <Route path='/search' element={<iframe src="https://foirstein-2-front-1.onrender.com" title="ProjectB" width="100%" height="600px" />}></Route>
     <Route path='/Librarian' element={<iframe src="https://diversi-tech.github.io/foirstein-3-front" title="ProjectC" width="100%" height="600px" />}></Route>
     <Route path='/Charts' element={<Charts></Charts>}></Route>
     <Route path='login/home' element={<Home></Home>}></Route>
     <Route path='/ActivityLog' element={<ActivityLog></ActivityLog>}></Route>
     <Route path='/changePermission' element={<ChangePermission></ChangePermission>}></Route>
     <Route path='/UserManagementComponent' element={<UserManagementComponent></UserManagementComponent>}></Route> 
     <Route path="/login" element={<Login />} /> 
     <Route path="/" element={<Login />} />
     <Route path="/profile" element={<Profile />} />
     <Route path="/profileform" element={<ProfileForm/>} />
     <Route path="home" element={<Home />} />
     <Route path="/ManagerDashboard" element={<ManagerDashboard/>} />
     <Route path="/view-reports" element={<ViewReports/>} />
     <Route path="/report/:reportId" element={<ReportPage />} />
     <Route path="login/register" element={<Register />} />
     <Route path="login/security-question" element={<SecurityQuestions />} />
     <Route path="/reset-password" element={<ResetPassword />} />
     <Route path="/password-reset-success" element={<PasswordResetSuccess/>} />
     <Route path="login/security-question/reset-password/password-reset-success/login" element={<Login />} />
     <Route path="login/security-question/reset-password/password-reset-success/login/home" element={<Home />} />
     <Route path="/passwordRecovery" element={<PasswordRecovery />} /> 
    </Routes>
    <Footer />
    </div>
    </AccessibilityProvider>
     </HashRouter>
} 