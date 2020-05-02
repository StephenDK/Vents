// CH 8 Step 2: Action Creators that return actions

import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
} from "./eventConstants";
import {
  asyncActionStart,
  asyncActionFinished,
  asyncActionError,
} from "../async/asyncActions";
import { fetchSampleData } from "../../data/mockApi";
import { toastr } from "react-redux-toastr";

// 13.4 we are going to add redux toastr to creating and updating events actions
// instead of using a single dispatch we must use dispatch() to send multiple events
export const createEvent = (event) => {
  // We are passing in the event
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_EVENT,
        payload: {
          event,
        },
      });
      toastr.success("Success!", "Event has been created");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};
// action creator for updating event
export const updateEvent = (event) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: {
          event,
        },
      });
      toastr.success("Success!", "Event has been updated");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};
// action creator for deleting an event
// passing in event id
export const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId,
    },
  };
};

// 12.21 new action creater to fetch the events
export const loadEvents = () => {
  return async (dispatch) => {
    try {
      // First we will set our loading in store to true
      dispatch(asyncActionStart());
      const events = await fetchSampleData();
      dispatch({ type: FETCH_EVENTS, payload: { events } });
      dispatch(asyncActionFinished());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
// 12.22 now we need a reducer to take the dispatched events and
// save them into the store. head to eventReducer
