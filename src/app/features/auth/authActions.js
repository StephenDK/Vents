import { LOGIN_USER, SIGN_OUT_USER } from "./authConstants";
import { closeModal } from "../modals/modalActions";

// 12.31 we refactored the code below to allow for async operations
// since we will fetch user from database
export const login = (creds) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER,
      payload: {
        creds,
      },
    });
    dispatch(closeModal())
  };
};
// 12.32 lastly we need to hide the createEvent and people button 
// on the dashboard. head over to dashboard


export const logout = () => {
  return {
    type: SIGN_OUT_USER,
  };
};
