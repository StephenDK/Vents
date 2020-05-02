import { INCREMENT_COUNTER, DECREMENT_COUNTER, CHANGE_NAME } from "./testConstants";

import { asyncActionFinished } from '../async/asyncActions';
import { ASYNC_ACTION_START } from "../async/asyncConstants";
// 3.1 An action is an object with a type and payload key
// The type key is for the imported action
// {
//     type: INCREMENT_COUNTER
//     payload: {
//            data: data
//     }
// }

//3.2 These are the actions that we will dispatch
// These are action creators that return actions
// next head to testReducer
export const incrementCounter = () => {
    return {
        type: INCREMENT_COUNTER
    }
}

export const decrementCounter = () => {
    return {
        type: DECREMENT_COUNTER
    }
}

// 12.7 below is a simulater request
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}
// 12.8 the action below will dispatch the asyncActionStart
// setting our loading flag to true in store, next is the delay of 1 second
// after we dispatch the incrementCounter that adds 1 to the current value 
// in state and then asyncActionFinished which sets loading to false
// Below is an examplke of async chaining without using .then()
export const incrementAsync = (name) => {
    // 12.14 these actions are now receiving the button name
    // we specified name as a parameter now we have access to the button name
    // now we must pass the button name to the dispatch dispatch(asyncActionStart(name))
    // the way above wont work so we must specify the action type
    // check redux chrome dev tool for update then head to testComponent
    return async dispatch => {
        dispatch({type: ASYNC_ACTION_START, payload: name})
        await delay(1000);
        dispatch(incrementCounter())
        dispatch(asyncActionFinished())
    }
}

export const decrementAsync = (name) => {
    return async dispatch => {
        dispatch({type: ASYNC_ACTION_START, payload: name})
        await delay(1000);
        dispatch({type: DECREMENT_COUNTER}) //two ways to dispatch action
        dispatch(asyncActionFinished())
    }
}
// 12.9 Head over to test component
// and import the actions and place in mapDispatchToProps
// after we can use the actions in our buttons


// Practice redux
export const nameChange = () => {
    return {
        type: CHANGE_NAME
    }
}