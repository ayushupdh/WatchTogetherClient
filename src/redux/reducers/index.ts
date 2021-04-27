import { combineReducers } from "redux";
import auth, { AuthReducerType } from "./authReducers";
import session from "./sessionReducers";

// Combine the two reducer into one
export default combineReducers({
  auth,
  session,
});
