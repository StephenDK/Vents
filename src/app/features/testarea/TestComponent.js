import React, { Component } from 'react';
// 2.1 Bring in HOC connect to connect component to store
import  { connect } from 'react-redux';
import { incrementCounter, decrementCounter } from './testActions';
import { Button } from 'semantic-ui-react';
import TestPlaceInput from './TestPlaceInput';


// 2.3 create function to map store state to component props
// and pass state to function set state data to new key.
const mapStateToProps = (state) => ({
    //data: state.data
    //4.5 change to data: state.test.data because of rootReducer
    data: state.test.data
})

//3.6 this is where you create mapDispatchToProps objects
// with the action creators
const mapDispatchToProps = {
    incrementCounter,
    decrementCounter
};
// 3.7 now pass the mapDispatchToProps to the connect function below
// by adding it to connect the actions become available as props
// Check reducers folder/ rootreducer file for 4.0

class TestComponent extends Component {
    render() {
        const { data, incrementCounter, decrementCounter } = this.props; // 3.8 destruct props
        return(
            <div>
                <h1>Test Component</h1>
                {/* 2.5 access the state date using props 
                    check testConstants for 3.0
                */}
                <h3>The answer is {data}</h3>
                <Button onClick={incrementCounter} positive content='Increment'></Button>
                <Button onClick={decrementCounter} negative content='Decrement'></Button>
                <br />
                <br />
                <TestPlaceInput />
            </div>
        )
    }
};

// 2.2 wrap the component in the connect component
export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);
// 2.4 pass mapStateToProps to connect function



// Redux setup steps
// 1. Setup the redux store inside app
// View store folder > configureStore.js file