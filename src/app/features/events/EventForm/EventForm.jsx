import React, { Component } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { createEvent, updateEvent } from "../eventActions";
import cuid from "cuid";

// 9.1 import reduxForm and Field. reduxForm is a HOC and
// we must pass our form into
import { reduxForm, Field } from "redux-form";
// 9.8 continued... import new text field component and pass into
// redux field component. We can replace all text fields with new component
// 9.9 description component found in common/form/TextArea.jsx
import TextInput from "../../../common/form/TextInput";

//9.10 Import the TextArea and pass into description field component
// 9.11 Category Component found in common/form/SelectInput.jsx
import TextArea from "../../../common/form/TextArea";

//9.13 import SelectInput component and pass into category field
import SelectInput from "../../../common/form/SelectInput";

// 9.17 import DateInput component and add date to validator
import DateInput from "../../../common/form/DateInput";

// 9.14 Import of revalidate from helper functions
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan,
} from "revalidate";

const mapStateToProps = (state, ownProps) => {
  // Uncomment to see
  // console.log(ownProps.match);
  // console.log(ownProps.match.params.id);
  const eventId = ownProps.match.params.id;

  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter((event) => event.id === eventId)[0];
  }

  return {
    initialValues: event,
  };
};

//9.13 these are the categories we are going to use in the selectInput component
// pass as options
const mapDispatchToProps = {
  createEvent,
  updateEvent,
};

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" },
];

// 9.14 Revalidate form validation setup
// first import combine validators and validate helper functions from revalidate
// below is how you validate each form field with a return message if error
// Now we have to pass validate into our redux form config function at the bottom
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
  onFormSubmit = (values) => {
    console.log(values);
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.push(`/events/${this.props.initialValues.id}`);
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Bob",
      };
      this.props.createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`);
    }
  };

  render() {
    //9.16 to disable the submit button we can use some redux form props
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine,
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
              {/* 9.3 We can now start replacing the form fields with 
                    redux Field tag imported above. Instead of using the input component
                    we can create our own component with semantic ui styles and pass it in.
                    9.4 in common/form/TextInput.jsx
                */}
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
                component={TextInput}
                placeholder="Event city"
              />
              <Field
                name="venue"
                component={TextInput}
                placeholder="Event venue"
              />
              <Field
                name="date"
                component={DateInput}
                dateFormat="dd LLL yyyy h:mm a"
                showTimeSelect
                timeFormat='HH:mm'
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
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

// 9.2 reduxForm requires some setup like the name of the form
// Order of operations in this code below matters
// Our connection function below takes two parameters. The redux from and the form component
// Check the event form component in dev tools to see what we access to.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "eventForm", validate })(EventForm));
//9.15 above we pass validate helper functions into event form

// 9.16 Date Picker go to DateInput.jsx file
