import { BrowserRouter, Route, Routes } from "react-router-dom"
import SecurityQuestions from "./securityQuestions"
import ResetPassword from "./reserPassword"
import PasswordResetSuccess from "./passwordResetSuccess"

export  const PasswordRouting=()=>{
return(
  <BrowserRouter>
    <Routes>
        {/* <Route path="/" element={<PasswordRecovery />} /> */}
        <Route path="/security-question" element={<SecurityQuestions />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/password-reset-success" element={<PasswordResetSuccess/>} />
      </Routes>
      </BrowserRouter>
)
}
export default PasswordRouting;