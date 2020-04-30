import React, { Component } from "react";
// 2.1 Bring in HOC connect to connect component to store
import { connect } from "react-redux";
// 12.9 import new async functions and add to mapDispatchToProps
import {
  incrementCounter,
  decrementCounter,
  nameChange,
  incrementAsync,
  decrementAsync,
} from "./testActions";
import { Button } from "semantic-ui-react";
import TestPlaceInput from "./TestPlaceInput";
import SimpleMap from "./SimpleMap";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { openModal } from "../modals/modalActions";

// 2.3 create function to map store state to component props
// and pass state to function set state data to new key.
const mapStateToProps = (state) => ({
  //data: state.data
  //4.5 change to data: state.test.data because of rootReducer
  data: state.test.data,
  name: state.test.name,
  loading: state.async.loading
});

//3.6 this is where you create mapDispatchToProps objects
// with the action creators
const mapDispatchToProps = {
  incrementCounter,
  decrementCounter,
  openModal,
  nameChange,
  incrementAsync,
  decrementAsync
};
// 3.7 now pass the mapDispatchToProps to the connect function below
// by adding it to connect the actions become available as props
// Check reducers folder/ rootreducer file for 4.0

class TestComponent extends Component {
  state = {
    latlng: {
      lat: 59.95,
      lng: 30.33,
    },
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);
        this.setState({
          latlng: latLng,
        });
      })
      .catch((error) => console.error("Error", error));
  };

  render() {
    const {
      name,
      nameChange,
      data,
      incrementCounter,
      decrementCounter,
      openModal,
      incrementAsync,
      decrementAsync,
      loading
    } = this.props; // 3.8 destruct props

    return (
      <div>
        <h1>Test Component</h1>
        {/* 2.5 access the state date using props 
                    check testConstants for 3.0
                */}
        <h3>The answer is {data}</h3>
        <h3>Your name is {name}</h3>
        <Button onClick={nameChange} positive content="Change Name"></Button>
        <Button
          onClick={incrementCounter}
          positive
          content="Increment"
        ></Button>
        <Button
          onClick={decrementCounter}
          negative
          content="Decrement"
        ></Button>
        <Button
          onClick={incrementAsync}
          loading={loading}
          positive
          content="Async Increment"
        ></Button>
        <Button
          onClick={decrementAsync}
          loading={loading}
          positive
          content="Async Decrement"
        ></Button>
        <Button
          onClick={() => {
            openModal("TestModal", { data: 42 });
          }}
          color="teal"
          content="Open Modal"
        ></Button>
        <br />
        <br />
        <TestPlaceInput selectAddress={this.handleSelect} />
        <SimpleMap key={this.state.latlng.lng} latlng={this.state.latlng} />
      </div>
    );
  }
}

// 2.2 wrap the component in the connect component
export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);
// 2.4 pass mapStateToProps to connect function

// Redux setup steps
// 1. Setup the redux store inside app
// View store folder > configureStore.js file
