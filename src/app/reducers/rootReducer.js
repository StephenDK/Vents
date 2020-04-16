// 4.0 We are going to combine reducers using 
// the redux combine reducers function

import { combineReducers } from "redux";
import testReducer from '../features/testarea/testReducer';
import eventReducer from "../features/events/eventReducer";

// 4.1 to use the testReducer we can just call test
const rootReducer = combineReducers({
    test: testReducer,
    events: eventReducer
})


//4.2 export rootReducer
// next head to store to import rootReducer
export default rootReducer;