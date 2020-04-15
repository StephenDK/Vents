import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstants";

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