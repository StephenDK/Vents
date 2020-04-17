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
import TextArea from '../../../common/form/TextArea';

const mapStateToProps = (state, ownProps) => {
  // Uncomment to see
  // console.log(ownProps.match);
  // console.log(ownProps.match.params.id);
  const eventId = ownProps.match.params.id;

  let event = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: "",
  };

  if (eventId && state.events.length > 0) {
    event = state.events.filter((event) => event.id === eventId)[0];
  }

  return {
    event,
  };
};

const mapDispatchToProps = {
  createEvent,
  updateEvent,
};

class EventForm extends Component {

  handleFormSubmit = (evt) => {
    evt.preventDefault();
    // console.log(this.refs.title.value);
    // console.log(this.state);
    if (this.state.id) {
      this.props.updateEvent(this.state);
      this.props.history.push(`/events/${this.state.id}`);
    } else {
      const newEvent = {
        ...this.state,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
      };
      this.props.createEvent(newEvent);
      this.props.history.push(`/events`);
    }
  };

 

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event Details' />
            <Form onSubmit={this.handleFormSubmit} autoComplete="off">
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
                component={TextInput}
                placeholder="What is your event about"
              />
              <Field
                name="description"
                component={TextArea}
                rows={3}
                placeholder="Tell us about your event"
              />
              <Header sub color='teal' content='Event Location Details' />
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
              <Button type="button" onClick={this.props.history.goBack}>
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
