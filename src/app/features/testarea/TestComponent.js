import React, { Component } from "react";

import { connect } from "react-redux";

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

// 12.15 now access the elementName from the store to check if the elementName
// is the same as the button name and then display loading 
const mapStateToProps = (state) => ({
  data: state.test.data,
  name: state.test.name,
  loading: state.async.loading,
  buttonName: state.async.elementName
});

const mapDispatchToProps = {
  incrementCounter,
  decrementCounter,
  openModal,
  nameChange,
  incrementAsync,
  decrementAsync
};

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
      loading,
      buttonName
    } = this.props;

    return (
      <div>
        <h1>Test Component</h1>
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
          onClick={(e) => incrementAsync(e.target.name)}
          // 12.10 Redux Thunk comes with a loading property. To isolate our loading
          // property to a specific button give buttons a name. Now we have to pass 
          // the name of the button as a parameter. make onClick into arrow functions
          // after head to asyncReducer to store the name of the button
          name='increment'
          // 12.16 we can check is the elementName equals the button name
          // and then deisplay loading if it does.
          loading={buttonName === 'increment' && loading}
          positive
          content="Async Increment"
        ></Button>
        <Button
          onClick={(e) => decrementAsync(e.target.name)}
          loading={buttonName === 'decrement' && loading}
          name='decrement'
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


export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);

