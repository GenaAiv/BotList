import { combineReducers } from "redux";
import { tableReducer } from "./reducers/tableReducer";
import { signInReducer } from "./reducers/signInReducer";

export const rootReducer = combineReducers({
  table: tableReducer,
  signIn: signInReducer,
  // signInReducer
});
