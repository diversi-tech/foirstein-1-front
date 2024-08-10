import {produce} from 'immer'

export const InitialState={
    //רשימה שתמולא מהשרת
    activityLogList:[
      //  {
      //   "logId": 1,
      //   "userId": "317807113",
      //   "activity": "התחלת פעילות",
      //   "timestamp": "2021-06-01T12:00:00.000+00:00",
    
      //  },
      //  {
      //   "logId": 2,
      //   "userId": "317827113",
      //   "activity": "התחלת פעילות",
      //   "timestamp": "2021-06-01T12:00:00.000+00:00",
    
      //  }
    ]
}
export const activityLogReducer=produce((state,action)=>{
    switch(action.type){
  case  'FillLog':state.activityLogList=action.payload
    break;
    default:
      return state;
    }
   },InitialState)