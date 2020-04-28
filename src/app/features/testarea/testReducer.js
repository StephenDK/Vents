import { INCREMENT_COUNTER, DECREMENT_COUNTER, CHANGE_NAME } from "./testConstants";
import { createReducer } from "../../common/util/reducerUtils";

// 1.3 Initialize the state
const initialState = {
    data: 42,
    name: 'Stephen'
}

// ================================================
// 6.0 REFACTORING SECTION
// We are refactoring the code below into this

const incrementCounter = (state) => {
    console.log(state);
    return { ...state, data: state.data + 1 };
}

const decrementCounter = (state) => {
    return { ...state, data: state.data - 1 };
}

const nameChange = (state) => {
    return { ...state, name: 'Bob'}
}
// ================================================

// 6.1 import createReducer and export it
export default createReducer(initialState, {
    [INCREMENT_COUNTER]: incrementCounter,
    [DECREMENT_COUNTER]: decrementCounter,
    [CHANGE_NAME]: nameChange
})

// 1.4 create a reducer
// 1.5 set state to initial state above
// const testReducer = (state = initialState, action) => {  //3.3 nect pass the actions to reducer
    
//     // 3.4 next the switch statement will decide which action to call
//     switch (action.type) {
//         case INCREMENT_COUNTER:
//             // 3.5the spread operator spreadsinitial state
//             // than sets data to state.data + 1
//             return {...state, data: state.data + 1};
//         case DECREMENT_COUNTER:
//             return {...state, data: state.data - 1}
//         default:
//             return state;
//     }
//     // 3.5 To make this all work we have to hook our actions up in the testComponent
    
//     //return state;
// }

// 1.6 export reducer
// export default testReducer;