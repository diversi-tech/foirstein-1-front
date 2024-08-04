import {produce} from 'immer'

export const InitialState={
    //רשימה שתמולא מהשרת
    userList:[
     
    ],
    permissionsList: [] 
}
export const userReducer=produce((state,action)=>{
    switch(action.type){
  case  'FILL_DATA':state.userList=action.payload
    break;
    case 'FILL_PERMISSIONS':  // Add this case
    state.permissionsList = action.payload;
    break;
  default:
    return state;
    }
   },InitialState)