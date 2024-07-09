// import { FILL_DATA3 } from './actions/ApprovalRequestAction';
import produce from 'immer';

export const InitialState = {
  ApprovalList: []
};

export const approvalRequestReducer = produce((state, action) => {
  switch (action.type) {
    case 'FILL_DATA3':
      state.ApprovalList = action.payload; // שמור את הנתונים כמות שהם
      break;
    default:
      break;
  }
}, InitialState);
