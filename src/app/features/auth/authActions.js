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
      displayName: user.displayName,
    });
    let newUser = {
      displayName: user.displayName,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    await firestore.set(`users/${createdUser.user.uid}`, { ...newUser });
    dispatch(closeModal());
  } catch (error) {
    console.log(error);
    // 15.8 added the error Submission below
    // head back to submission form
    throw new SubmissionError({
      _error: error.message,
    });
  }
};
// 15.9 head over to the registerForm component

// 15.14 This new method is for logging a user in with facebook
export const socialLogin = (selectedProvider) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    dispatch(closeModal());
    const user = await firebase.login({
      provider: selectedProvider,
      type: "popup",
    });
    //console.log(user);
    // 15.15 There is no schema in firebase. The developer sets the schema
    // firebase does not care if its supposed to be string or boolean
    // the code below is if the user is firstTime. Uncomment console.log(user)
    // 15.16 head over to the configureStore file
    if (user.additionalUserInfo.isNewUser) {
      await firestore.set(`users/${user.user.uid}`, {
        displayName: user.profile.displayName,
        photoURL: user.profile.avatarUrl,
        createdAt: firestore.FieldValue.serverTimestamp()

      })
    }
  } catch (error) {
    console.log(error);
  }
};
// now head to LoginForm to hook up method
