import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./login"
import Home from "./home"
import Register from "./register"
import SecurityQuestions from "../resetPassword/securityQuestions"
import ResetPassword from "../resetPassword/reserPassword"
import PasswordResetSuccess from "../resetPassword/passwordResetSuccess"

export  const LoginRouting=()=>{
return(
  <BrowserRouter>
    <Routes>
  
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/security-question" element={<SecurityQuestions />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/password-reset-success" element={<PasswordResetSuccess/>} />
      </Routes>
      </BrowserRouter>
)
}
export default LoginRouting;