import { BrowserRouter,Route,Routes } from "react-router-dom"
import { AdminNav } from "./adminNav"

import  ChangePermission  from "./changePermission"
// import { Charts } from "./Charts"
import UserManagementComponent from "./adminEditing"
import ActivityLog from './ActivityLog'
import { Login } from "@mui/icons-material"



export const RoutingAdmin=()=>{
    return <BrowserRouter>
    <AdminNav></AdminNav>
    <Routes>
     <Route path='/ActivityLog' element={<ActivityLog></ActivityLog>}></Route>
     <Route path='/changePermission' element={<ChangePermission></ChangePermission>}></Route>
<Route path='/UserManagementComponent' element={<UserManagementComponent></UserManagementComponent>}></Route> 
    </Routes>
     </BrowserRouter>
} 