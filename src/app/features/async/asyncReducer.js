import { createReducer } from "../../common/util/reducerUtils"
import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from "./asyncConstants"


// 12.4 next create the initial state 
const initialState = {
    loading: false,
    // 12.11 we will add the name of the button clicked into our store
    elementName: null
}

// 12.5 now create our reducers 
const asyncActionStarted = (state, payload) => {
    // 12.12 To get the button name we must add payload because thats how we get
    // whatever is passed into our action in testComponent
    return {
        ...state,
        loading: true,
        elementName: payload
    }
}

const asyncActionFinished = (state) => {
    // 12.13 when we are finished loading set the elementName to null
    // do the same for the asyncActionError
    // now how dod we get the payload over to these functions?
    // head over to asyncActions file
    return {
        ...state,
        loading: false,
        elementName: null
    }
}

const asyncActionError = (state) => {
    return {
        ...state,
        loading: false,
        elementName: null
    }
}

// 12.5 now we must export the reducers and the initial state
// the function below takes the initial state and then acts as a decider 
// of what reducer to use depending on the action
export default createReducer(initialState, {
    [ASYNC_ACTION_START]: asyncActionStarted,
    [ASYNC_ACTION_FINISH]: asyncActionFinished,
    [ASYNC_ACTION_ERROR]: asyncActionError
});

// 12.6 last step add these reducers to the rootReducer
// head to rootReducer.js
// After rootreducer we are in the test area testActions file