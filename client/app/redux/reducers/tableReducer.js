import * as actions from "../actionTypes";

const initialState = {
  tableData: [],
  isLoading: true
};

export const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_TABLE:
      return {
        ...state,
        isLoading: false,
        tableData: action.payload
      };
    case actions.FETCH_ERROR:
      return {
        ...state
      };
    case actions.UPDATE_TABLE:
      return {
        isLoading: false,
        tableData: action.payload
      };
    case actions.BOT_DELETED:
      return {
        isLoading: false,
        tableData: action.payload
      };
    case actions.DELETE_ERROR:
      return {
        isLoading: false,
        tableData: action.payload
      };
    case actions.BOT_ADD:
      return {
        isLoading: false,
        tableData: action.payload
      };
    default:
      return state;
  }
};

export const getToken = (state = initialState, action) => {
  switch (action.type) {
    case actions.IS_LOADING:
      return true;
    default:
      return state.isLoading;
  }
};

// export const deleteBot =
