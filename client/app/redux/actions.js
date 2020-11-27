import * as actions from "./actionTypes";
import axios from "axios";
import {
  getFromStorage,
  setInStorage,
  removeFromStorage
} from "../utils/storage";
import store from "./store";

export const fetchTable = () => dispatch => {
  dispatch({ type: actions.IS_LOADING });
  axios
    .get("/botlist/list")
    .then(res => {
      if (res.data.success)
        return dispatch({
          type: actions.FETCH_TABLE,
          payload: res.data.results
        });
    })
    .catch(err => {
      dispatch({
        type: actions.FETCH_ERROR,
        payload: err
      });
    });
};

export const signIn = user => dispatch => {
  dispatch({ type: actions.IS_LOADING });
  axios({
    method: "POST",
    url: "/api/account/signin",
    data: user,
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      const { token } = res.data;
      if (res.data.success) {
        console.log(res.data);
        setInStorage("bebeToken", { token });
        return dispatch({
          type: actions.SIGNED_IN,
          payload: res.data
        });
      } else {
        return dispatch({
          type: actions.SIGN_IN_ERROR,
          payload: res.data
        });
      }
    })
    .catch(err =>
      dispatch({
        type: actions.SIGN_IN_ERROR,
        payload: err
      })
    );
};

export const getToken = () => dispatch => {
  dispatch({ type: actions.IS_LOADING });
  //get the token from storage

  const obj = getFromStorage("bebeToken");
  if (obj && obj.token) {
    ///assign the token
    const { token } = obj;
    //verify the token

    axios
      .get(`/api/account/verify?token=${token}`)
      .then(res => {
        if (res.data.success) {
          return dispatch({
            type: actions.GOT_TOKEN,
            payload: res.data
          });
        } else {
          dispatch({
            type: actions.SIGN_IN_ERROR,
            payload: ""
          });
        }
      })
      .catch(err =>
        dispatch({
          type: actions.SIGN_IN_ERROR,
          payload: err
        })
      );
  }
};

export const signOut = () => dispatch => {
  console.log(store.getState().signIn.token);
  dispatch({ type: actions.IS_LOADING });
  const { token } = store.getState().signIn;
  axios.get(`/api/account/logout?token=${token}`).then(res => {
    console.log("data from actions", res.data);
    if (res.data.success) {
      removeFromStorage("bebeToken");
      dispatch({
        type: actions.SIGN_OUT,
        payload: res.data
      });
    }
  });
};
export const updateTable = (endpoint, value, id) => dispatch => {
  dispatch({ type: actions.IS_LOADING });
  let dataVal = {
    value,
    _id: id
  };
  axios({
    method: "PATCH",
    url: `/botlist/update/${endpoint}`,
    data: dataVal,
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.data.success) {
        console.log("res actions", res.data);
        dispatch({
          type: actions.UPDATE_TABLE,
          payload: res.data.results
        });
      } else {
        dispatch({
          type: actions.FETCH_ERROR
        });
      }
    })
    .catch(err => {
      dispatch({
        type: actions.FETCH_ERROR,
        payload: err
      });
    });
};
// On update check if the inputted value is bigger then value stored in DB
// or store row number for each item,
export const deleteBot = id => dispatch => {
  let data = {
    id
  };
  axios({
    method: "DELETE",
    url: `/botlist/remove`,
    data,
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      console.log("res from actions", res);
      if (res.data.success) {
        dispatch({
          type: actions.BOT_DELETED,
          payload: res.data.results
        });
      } else {
        dispatch({
          type: actions.DELETE_ERROR,
          payload: res.data.results
        });
      }
    })
    .catch(err => {
      dispatch({
        type: actions.FETCH_ERROR,
        payload: err
      });
    });
};

export const addBot = data => dispatch => {
  dispatch({ type: actions.IS_LOADING });
  axios({
    method: "POST",
    url: `/botlist/add`,
    data,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    }
  })
    .then(res => {
      if (res.data.success) {
        console.log("data from front", res.data);
        dispatch({
          type: actions.BOT_ADD,
          payload: res.data.results
        });
      } else {
        dispatch({
          type: actions.DELETE_ERROR,
          payload: res.data.results
        });
      }
    })
    .catch(err => {
      dispatch({
        type: actions.FETCH_ERROR,
        payload: err
      });
    });
};
