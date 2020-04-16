//6.0 
export const createReducer = (initialState, fnMap) => {
    return (state = initialState, {type, payload}) => {
        const handler = fnMap[type];

        return handler ? handler(state, payload) : state
    }
}

//6.1 head to test reducer