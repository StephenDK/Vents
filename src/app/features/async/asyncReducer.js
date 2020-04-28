import { createReducer } from "../../common/util/reducerUtils"
import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from "./asyncConstants"


// 12.4 next create the initial state 
const initialState = {
    loading: false
}

// 12.5 now create our reducers 
const asyncActionStarted = (state) => {
    return {
        ...state,
        loading: true
    }
}

const asyncActionFinished = (state) => {
    return {
        ...state,
        loading: false
    }
}

const asyncActionError = (state) => {
    return {
        ...state,
        loading: false
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