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
    const { history, initialValues } = this.props;
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
              <Field name="date" component={TextInput} placeholder="Date" />
              <Button positive type="submit">
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
)(reduxForm({ form: "eventForm" })(EventForm));
