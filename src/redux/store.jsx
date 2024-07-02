import { userReducer } from "./reducer/userReducer"
import { createStore } from "redux";
import { combineReducers } from "redux";
import { reportsReducer } from "./reducer/reportsReducer";
import { activityLogReducer } from "./reducer/activityLogReducer";

export const reducer=combineReducers({userReducer,reportsReducer,activityLogReducer})
export const store=createStore(reducer)
window.store=store