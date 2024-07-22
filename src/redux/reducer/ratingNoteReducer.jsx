import produce from 'immer';

export const InitialState = {
  RatingNoteList: []
};

export const RatingNoteReducer = produce((state, action) => {
  switch (action.type) {
    case 'FILL_DATA7':
    
      state.RatingNoteList = action.payload; // שמור את הנתונים כמות שהם
      break;
  
  }
}, InitialState);
// src/redux/reducers/RatingNoteReducer.js
// import { produce } from 'immer';

// export const InitialState = {
//   RatingNoteList: [],
//   loading: false,  // הוסף את מצב הטעינה
// };

// export const RatingNoteReducer = produce((state, action) => {
//   switch (action.type) {
//      case 'FILL_DATA1':
//       return {
//         ...state,
//         RatingNoteList: action.payload,
//       };
//       break;
   
//     default:
//       break;
//   }
// }, InitialState);
