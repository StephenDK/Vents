// 4.0 We are going to combine reducers using 
// the redux combine reducers function

import { combineReducers } from "redux";
import testReducer from '../features/testarea/testReducer';
import eventReducer from "../features/events/eventReducer";


// Chapter 9.0 Adding Redux forms
// To use redux from first import redux form reducer and add to root reducer
// Then head over to the form where you want to configure
import { reducer as FormReducer } from 'redux-form';
import modalReducer from "../features/modals/modalReducer";

// 4.1 to use the testReducer we can just call test
const rootReducer = combineReducers({
    form: FormReducer,
    test: testReducer,
    events: eventReducer,
    modals: modalReducer
})


//4.2 export rootReducer
// next head to store to import rootReducer
export default rootReducer;