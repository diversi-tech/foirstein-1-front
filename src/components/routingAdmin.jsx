import { BrowserRouter,Route,Routes } from "react-router-dom"
import { AdminNav } from "./adminNav"
import {ActivityLog} from "./ActivityLog"
import { AdminPanel } from "./changePermission"
import { Charts } from "./Charts"
import UserManagementComponent from "./adminEditing"

export const RoutingAdmin=()=>{
    return <BrowserRouter>
    <AdminNav></AdminNav>
    <Routes>
     <Route path='/ActivityLog' element={<ActivityLog></ActivityLog>}></Route>
     <Route path='/changePermission' element={<AdminPanel></AdminPanel>}></Route>
     <Route path='/Charts' element={<Charts></Charts>}></Route> 
     <Route path='/UserManagementComponent' element={<UserManagementComponent></UserManagementComponent>}></Route>
    </Routes>
     </BrowserRouter>
} 