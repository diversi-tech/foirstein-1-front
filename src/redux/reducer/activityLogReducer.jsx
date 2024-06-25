import {produce} from 'immer'

export const InitialState={
    //רשימה שתמולא מהשרת
    activityLogList:[
       
    ]
}
export const activityLogReducer=produce((state,action)=>{
    switch(action.type){
  case  'FILL_DATA':state.activityLogList=action.payload
    break;
    }
   },InitialState)