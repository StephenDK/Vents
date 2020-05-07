import { createStore, applyMiddleware } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import firebase from "../config/firebase";

// 15.16 updateProfileOnLogin stops the data base from rewritting the data 
// everytime a user logs in.
// 15.17 display UserName on nav head to NAVBAR.js
const rrfConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false
};

// Chanpter 12.0 Configuring Redux thunk
// We first have to configure our store to use the redux thunk middlware
export const configureStore = () => {
  // 12.1 We have to configure createStore to use our reducers, middleware, and devTools
  // below is how we pass them all into createStore
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];

  const composedEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares),
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  );

  const store = createStore(rootReducer, composedEnhancer);
  // 12.2 found in features/async/asyncConstants

  return store;
};
