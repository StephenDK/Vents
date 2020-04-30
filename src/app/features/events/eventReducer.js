// CH 8 Step 3: Event Reducers

import { createReducer } from '../../common/util/reducerUtils';
import { UPDATE_EVENT, CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from './eventConstants';

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

// 12.23 this reducer will take the dispatched action with our events 
// and save them to the store
// after add to our createReducer lookup
const fetchEvents = (state, payload) => {
  return payload.events
}
// 12.24 to call this fetch function we can do it directly from index.js

// now use our reducer functions
export default createReducer(initialState, {
    [CREATE_EVENT]: createEvent,
    [UPDATE_EVENT]: updateEvent,
    [DELETE_EVENT]: deleteEvent,
    [FETCH_EVENTS]: fetchEvents
})

// DONT FORGET TO ADD TO ROOT REDUCER