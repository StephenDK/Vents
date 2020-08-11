/*global google*/
import React, { Component } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { createEvent, updateEvent, cancelToggle } from "../eventActions";
// import cuid from "cuid";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { reduxForm, Field } from "redux-form";
import TextInput from "../../../common/form/TextInput";
import TextArea from "../../../common/form/TextArea";
import SelectInput from "../../../common/form/SelectInput";
import DateInput from "../../../common/form/DateInput";
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan,
} from "revalidate";
import PlaceInput from "../../../common/form/PlaceInput";
import { withFirestore } from "react-redux-firebase";


const mapStateToProps = (state, ownProps) => {
  // Uncomment to see
  // console.log(ownProps.match);
  // console.log(ownProps.match.params.id);
  const eventId = ownProps.match.params.id;

  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events.length > 0) {
    event = state.firestore.ordered.events.filter(event => event.id === eventId)[0] || {}
}

  return {
    initialValues: event,
    event
  };
};

const mapDispatchToProps = {
  createEvent,
  updateEvent,
  cancelToggle
};

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" },
];

const validate = combineValidators({
  title: isRequired({ message: "The event title is required" }),
  category: isRequired({ message: "The category is required" }),
  description: composeValidators(
    isRequired({ message: "Please enter a description" }),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters",
    })
  )(),
  city: isRequired("City"),
  venue: isRequired("Venue"),
  date: isRequired("Date"),
});

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
  };

  // 18.11 with the function below when the component loads
  // this function will be called getting the firestore data
  // with the matching param id
  // also please add reinitialize to the reduxForm wrapper component at the bottom
  // so that our data persists
  // 18.12 now head over to eventActions.js to update the updateEvent method 
  async componentDidMount() {
    const { firestore, match} = this.props;
    // let event = await firestore.get(`events/${match.params.id}`);
    // console.log(match);
    // console.log(event);
    // 18.17 we are going to now listen for data change inside firebase instead 
    // of getting a snapshot of data like below
    // This entire function has been refactored to listen to firebase changes
    // this change removes the latlng coordinates again. Check onFormSubmit method for fix
    await firestore.setListener(`events/${match.params.id}`);
    // if (!event.exists) {
    //   history.push("/events");
    //   toastr.error("Sorry", "Event not found");
    //   // 18.13 the code below sets the lat and Lng of our state from 
    //   // the event in the database. In return this sets the state lat lng
    //   // so when we update the event the lat lng remains the same
    //   // 18.14 Seyup of the cancel event button. Head to eventActions.js
    // } else {
    //   this.setState({
    //     venueLatLng: event.data().venueLatLng
    //   })
    // }
  }
  //18.21 The problem we are currently facing is with the firestore listener above.
  // By connecting this component with withFirestore higher order component firestore does 
  //everything for us. If we use the firestore.setListener the listener data will persist
  // even when our component unmounts. We dont want this.
  async componentWillUnmount() {
    const { firestore, match} = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
    // Now we are going to setup the buttons using conditionals
    // 18.22 head over to eventDetailedPage.jsx
  } 


  // 18.4 we are now setting up this method for submitting the event to firebase.
  // once we have connected the form to submit to firebase and it works
  // lets head over to eventDetailed.jsx to display the event data
  // 18.5 To fix the date error head over to EventDetailed.jsx
  onFormSubmit = async (values) => {
    //console.log(values);
    values.venueLatLng = this.state.venueLatLng;
    try {
      if (this.props.initialValues.id) {
        // 18.18 this is the fix for the missing lat lng in our database when we update the event
        // head over to eventActions for cancel event toastr confirmation
        if (Object.keys(values.venueLatLng).length === 0) {
          values.venueLatLng = this.props.event.venueLatLng
        }
        this.props.updateEvent(values);
        this.props.history.push(`/events/${this.props.initialValues.id}`);
      } else {
        let createdEvent = await this.props.createEvent(values);
        this.props.history.push(`/events/${createdEvent.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleCitySelect = (selectedCity) => {
    geocodeByAddress(selectedCity)
      .then((results) => getLatLng(results[0]))
      .then((latlng) => {
        this.setState({
          cityLatLng: latlng,
        });
      })
      .then(() => {
        this.props.change("city", selectedCity);
      });
  };

  handleVenueSelect = (selectedVenue) => {
    geocodeByAddress(selectedVenue)
      .then((results) => getLatLng(results[0]))
      .then((latlng) => {
        this.setState({
          venueLatLng: latlng,
        });
      })
      .then(() => {
        this.props.change("venue", selectedVenue);
      });
  };

  render() {
    //9.16 to disable the submit button we can use some redux form props
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine,
      event,
      cancelToggle
    } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              autoComplete="off"
            >
              <Field
                name="title"
                component={TextInput}
                placeholder="Give your event a name"
              />
              <Field
                name="category"
                component={SelectInput}
                options={category}
                placeholder="What is your event about"
              />
              <Field
                name="description"
                component={TextArea}
                rows={3}
                placeholder="Tell us about your event"
              />
              <Header sub color="teal" content="Event Location Details" />
              <Field
                name="city"
                component={PlaceInput}
                options={{ types: ["(cities)"] }}
                onSelect={this.handleCitySelect}
                placeholder="Event city"
              />
              <Field
                name="venue"
                component={PlaceInput}
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 1000,
                  types: ["establishment"],
                }}
                onSelect={this.handleVenueSelect}
                placeholder="Event Venue"
              />
              <Field
                name="date"
                component={DateInput}
                dateFormat="dd LLL yyyy h:mm a"
                showTimeSelect
                timeFormat="HH:mm"
                placeholder="Date"
              />
              <Button
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button
                type="button"
                onClick={
                  initialValues.id
                    ? () => history.push(`/events/${initialValues.id}`)
                    : () => history.push("/events")
                }
              >
                Cancel
              </Button>
              <Button 
              // 18.16 the cancel event button below
              // problem is we have to refresh the component to see the changes
              // next section is in componentdidmount method
                type="button"
                color={event.cancelled ? 'green': 'red'}
                floated='right'
                content={event.cancelled ? 'Reactivate event': 'Cancel event'}
                onClick={() => cancelToggle(!event.cancelled, event.id)}
              />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

//18.10 What we want to do is connect this component to firestore
// with the withFirestore higher order component that needs to be imported
// import and connect the component
export default withFirestore(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(reduxForm({ form: "eventForm", validate, enableReinitialize: true })(EventForm))
);
