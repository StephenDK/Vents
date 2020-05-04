// 15.1 displaying firebase login errors to user
// import SubmissionError from redux form
import { SubmissionError } from 'redux-form';

import { SIGN_OUT_USER } from "./authConstants";
import { closeModal } from "../modals/modalActions";


export const login = (creds) => {
  // 15.0 Firebase login setup.
  // we need to use firebase option with redux thunk
  // the authentication is stored with firebase not firestore
  return async (dispatch, getState, {getFirebase}) => {
    // with this firebase const below we have access to firebase methods
    const firebase = getFirebase();
    try {
      await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
      dispatch(closeModal())
    } catch (error) {
      console.log(error);
      // 15.1 we throw a new Submission error with the error message
      // and this becomes available in our form
      // head over to the login form
      throw new SubmissionError({
        _error: error.message
      })
    }
  };
};



export const logout = () => {
  return {
    type: SIGN_OUT_USER,
  };
};
