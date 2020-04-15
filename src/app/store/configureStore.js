import { createStore } from "redux"
import testReducer from '../features/testarea/testReducer';

export const configureStore = () => {
    // 1.1 store requires a reducer and store enhancer
    // 1.2 create a file "testReducer"

    // 1.7 import test reducer add pass into createStore
    const store = createStore(testReducer);
    // 1.8 connect store to appliation using <Provider> ...See index.js

    return store;
}