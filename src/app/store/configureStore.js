import { createStore } from "redux"
//import testReducer from '../features/testarea/testReducer';

//4.3 import rootReducer and replace testReducer with
// rootReducer
import rootReducer from '../reducers/rootReducer';


export const configureStore = () => {
    // 1.1 store requires a reducer and store enhancer
    // 1.2 create a file "testReducer"

    // 1.7 import test reducer add pass into createStore
    // const store = createStore(testReducer);
    // 1.8 connect store to appliation using <Provider> ...See index.js

    const store = createStore(rootReducer);  
    // 4.4 Since the testReducer is accessed throught test now
    // we have to change mapStateToProps function in testComponent
    // data: state.test.data
    return store;
}