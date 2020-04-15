import React, { Component } from 'react';
// 2.1 Bring in HOC connect to connect component to store
import  { connect } from 'react-redux';


// 2.3 create function to map store state to component props
// and pass state to function set state data to new key.
const mapStateToProps = (state) => ({
    data: state.data
})

class TestComponent extends Component {
    render() {
        return(
            <div>
                <h1>Test Component</h1>
                {/* 2.5 access the state date using props */}
                <h3>The answer is {this.props.data}</h3>
            </div>
        )
    }
};

// 2.2 wrap the component in the connect component
export default connect(mapStateToProps)(TestComponent);
// 2.4 pass mapStateToProps to connect function



// Redux setup steps
// 1. Setup the redux store inside app
// View store folder > configureStore.js file