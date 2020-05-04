// 15.1 displaying firebase login errors to user
// import SubmissionError from redux form
import { SubmissionError } from "redux-form";

import { closeModal } from "../modals/modalActions";

export const login = (creds) => {
  // 15.0 Firebase login setup.
  // we need to use firebase option with redux thunk
  // the authentication is stored with firebase not firestore
  return async (dispatch, getState, { getFirebase }) => {
    // with this firebase const below we have access to firebase methods
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
      // 15.1 we throw a new Submission error with the error message
      // and this becomes available in our form
      // head over to the login form
      throw new SubmissionError({
        _error: error.message,
      });
    }
  };
};

// 15.8 This method is to register a new user
export const registerUser = (user) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  // below gives us access to both api's
  const firebase = getFirebase();
  const firestore = getFirestore();

  try {
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
      console.log(createdUser);
      await createdUser.user.updateProfile({
        displayName: user.displayName
      })
      let newUser = {
        displayName: user.displayName,
        createdAt: firestore.FieldValue.serverTimestamp()
      }
      await firestore.set(`users/${createdUser.user.uid}`, {...newUser})
      dispatch(closeModal());
  } catch (error) {
    console.log(error);
  }
};
