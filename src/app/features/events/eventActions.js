// CH 8 Step 2: Action Creators that return actions

import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from "./eventConstants"

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