import {
  //CREATE_EVENT,
  // UPDATE_EVENT,
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
import { createNewEvent } from "../../common/util/helpers";


// 18.1 we are now going to setup the createEvent action to use firestore
export const createEvent = (event) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    // get firestore and firebase  instance
    const firestore = getFirestore();
    //const firebase = getFirebase();
    // Get the user's id
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    // 18.2 we are going to create a helper function to shape the event data 
    // and return an event object so we can submit the data to firestore
    // head to common/util/helper.js
    const newEvent = createNewEvent(user, photoURL, event)
    try {
      let createdEvent = await firestore.add('events', newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true
      })
      // 18.3 now that we have our data the way we want it lets head
      // over to the eventForm.jsx component on hook this method up.
      toastr.success("Success!", "Event has been created");
      return createdEvent;
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};
// action creator for updating event
// 18.12 the updateEvent below has been updated to use firestore
// only problem is when we update the database the LatLng is an empty array
// To fix this head back to eventForm.js
export const updateEvent = (event) => {
  return async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    try {
      await firestore.update(`events/${event.id}`, event);
      toastr.success("Success!", "Event has been updated");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};


export const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId,
    },
  };
};

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
