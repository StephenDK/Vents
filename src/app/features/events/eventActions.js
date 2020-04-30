// CH 8 Step 2: Action Creators that return actions

import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from "./eventConstants"
import { asyncActionStart, asyncActionFinished, asyncActionError } from "../async/asyncActions";
import { fetchSampleData } from "../../data/mockApi";

export const createEvent = (event) => {
    // We are passing in the event
    return {
        type: CREATE_EVENT,
        payload: {
            event
        }
    }
};
// action creator for updating event
export const updateEvent = (event) => {
    return {
        type: UPDATE_EVENT,
        payload: {
            event
        }
    }
}
// action creator for deleting an event
// passing in event id
export const deleteEvent = (eventId) => {
    return {
        type: DELETE_EVENT,
        payload: {
            eventId
        }
    }
}

// 12.21 new action creater to fetch the events
export const loadEvents = () => {
    return async dispatch => {
        try {
            // First we will set our loading in store to true
            dispatch(asyncActionStart())
            const events = await fetchSampleData();
            dispatch({type: FETCH_EVENTS, payload: {events}})
            dispatch(asyncActionFinished());
        } catch (error) {
            console.log(error);
            dispatch(asyncActionError());
        }
    }
}
// 12.22 now we need a reducer to take the dispatched events and 
// save them into the store. head to eventReducer