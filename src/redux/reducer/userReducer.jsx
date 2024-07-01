import {produce} from 'immer'

export const InitialState={
    //רשימה שתמולא מהשרת
    userList:[
      {
        "userId": "317807113",
        "username": "tzivi levi",
        "passwordHash": "uyo888",
        "email": "aaa@gmail.com",
        "role": "Student",
        "profilePicture": "",
        "createdAt": "2024-06-26T17:36:14.148",
        "updatedAt": "2024-06-26T17:36:14.148",
        "userDob": "2024-06-14T00:00:00",
        "phoneNumber": "0527578589"
      },
      {
        "userId": "317807113",
        "username": "tzivi levi",
        "passwordHash": "uyo888",
        "email": "aaa@gmail.com",
        "role": "Student",
        "profilePicture": "",
        "createdAt": "2024-06-26T17:36:14.148",
        "updatedAt": "2024-06-26T17:36:14.148",
        "userDob": "2024-06-14T00:00:00",
        "phoneNumber": "0527578589"
      }
    ]
}
export const userReducer=produce((state,action)=>{
    switch(action.type){
  case  'FILL_DATA':state.userList=action.payload
    break;
    }
   },InitialState)