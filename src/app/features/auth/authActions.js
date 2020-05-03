import { SIGN_OUT_USER } from "./authConstants";
import { closeModal } from "../modals/modalActions";

// 12.31 we refactored the code below to allow for async operations
// since we will fetch user from database
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
      console.log(error)
    }
  };
};
// 12.32 lastly we need to hide the createEvent and people button 
// on the dashboard. head over to dashboard


export const logout = () => {
  return {
    type: SIGN_OUT_USER,
  };
};
