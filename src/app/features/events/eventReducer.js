// CH 8 Step 3: Event Reducers

import { createReducer } from '../../common/util/reducerUtils';
import { UPDATE_EVENT, CREATE_EVENT, DELETE_EVENT } from './eventConstants';

// create initial state
 const initialState = [];

// create Reducer functions
const createEvent = (state, payload) => {
    // spread the old state and add the payload.event
    return [...state, payload.event]
}

const updateEvent = (state, payload) => {
    // below it spreads the state then filters the events by id and return an array
    // without the matching event id plus adds the new event to the array
    return [
        ...state.filter(event => event.id !== payload.event.id), payload.event
    ]
}

const deleteEvent = (state, payload) => {
    return [
        ...state.filter(event => event.id !== payload.eventId)
    ]
}

// now use our reducer functions
export default createReducer(initialState, {
    [CREATE_EVENT]: createEvent,
    [UPDATE_EVENT]: updateEvent,
    [DELETE_EVENT]: deleteEvent
})

// DONT FORGET TO ADD TO ROOT REDUCER