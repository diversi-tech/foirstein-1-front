import {produce} from 'immer'

export const InitialState={
    //רשימה שתמולא מהשרת
    userList:[
     
    ]
}
export const userReducer=produce((state,action)=>{
    switch(action.type){
  case  'FILL_DATA':state.userList=action.payload
    break;
    }
   },InitialState)