import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR,
} from "./asyncConstants";

// 12.3 our action creators
// import the action types and create action creators that return objects
// with type: actionConstants
export const asyncActionStart = () => {
  return {
    type: ASYNC_ACTION_START,
  };
};

export const asyncActionFinished = () => {
  return {
    type: ASYNC_ACTION_FINISH,
  };
};

export const asyncActionError = () => {
  return {
    type: ASYNC_ACTION_ERROR,
  };
};
// 12.4 next step is to create the reducers for these actions
// head to asyncReducer.js