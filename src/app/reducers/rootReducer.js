// 13.0 configuring redux-toaster for notifications
// first import the reducer from redux-toaster
// theadd redux-toastr to the combineReducers function
import { reducer as ToastrReducer } from 'react-redux-toastr';
import { combineReducers } from "redux";
import testReducer from '../features/testarea/testReducer';
import eventReducer from "../features/events/eventReducer";



import { reducer as FormReducer } from 'redux-form';
import modalReducer from "../features/modals/modalReducer";
import authReducer from "../features/auth/authReducer";
import asyncReducer from "../features/async/asyncReducer";


const rootReducer = combineReducers({
    form: FormReducer,
    test: testReducer,
    events: eventReducer,
    modals: modalReducer,
    auth: authReducer,
    async: asyncReducer,
    toastr: ToastrReducer
})
// 13.1 we must add the redux=toastr component to the root of our app
// head to index.js


export default rootReducer;