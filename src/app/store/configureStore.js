import { createStore, applyMiddleware } from "redux";


import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers/rootReducer';
import thunk from "redux-thunk";


// Chanpter 12.0 Configuring Redux thunk
// We first have to configure our store to use the redux thunk middlware
export const configureStore = () => {
    // 12.1 We have to configure createStore to use our reducers, middleware, and devTools
    // below is how we pass them all into createStore
    const middlewares = [thunk];
    
    const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

    const store = createStore(rootReducer, composedEnhancer);  
    // 12.2 found in features/async/asyncConstants
    
    return store;
}