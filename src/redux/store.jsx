import { userReducer } from "./reducer/userReducer"
import { createStore } from "redux";
import { combineReducers } from "redux";
import { reportsReducer } from "./reducer/reportsReducer";
import { RatingNoteReducer } from "./reducer/ratingNoteReducer";
import { approvalRequestReducer } from "./reducer/approvalRequestReducer";
import { colorReducer } from "./reducer/colorReducer";

import { activityLogReducer } from "./reducer/activityLogReducer";

export const reducer=combineReducers({  userReducer,
    reportsReducer,
    activityLogReducer,
    RatingNoteReducer,
    approvalRequestReducer,
    colorReducer})
export const store=createStore(reducer)
window.store=store