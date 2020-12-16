import * as actions from "../actionTypes";
import { getFromStorage } from "../../utils/storage";

const initialState = {
  token: "",
  signInError: "",
  isLoggedIn: false,
};

export const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GOT_TOKEN:
      return {
        isLoading: false,
        isLoggedIn: true,
        signInError: "",
        token: getFromStorage("bebeToken").token,
      };
    case actions.SIGNED_IN:
      return {
        isLoading: false,
        isLoggedIn: true,
        signInError: action.payload.message,
        token: action.payload.token,
      };
    case actions.SIGN_IN_ERROR:
      return {
        token: "",
        signInError: action.payload.message,
        isLoggedIn: false,
      };
    case actions.SIGN_OUT: {
      return {
        token: "",
        isLoggedIn: false,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
