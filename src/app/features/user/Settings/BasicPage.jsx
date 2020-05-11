// 16.1 this is the start of the basics page
// first we want to bring in the user data to display in the form
// 16.2 head to SettingsDashboard.jsx to pass user data into this component
import React, { Component } from "react";
import { Segment, Form, Header, Divider, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import DateInput from "../../../common/form/DateInput";
import PlaceInput from "../../../common/form/PlaceInput";
import TextInput from "../../../common/form/TextInput";

// 16.8 import the RadioButton we just created
import RadioInput from "../../../common/form/RadioInput";

// 16.9 Date picker setup
// import addYears
// 16.10 now lets create the action that will handle the form below
// head to userActions.js
import { addYears } from "date-fns";

// 16.12 This form below is hooked up to redux forms
// so it has a handleSubmit method. Pass the updateProfile
// into the handleSubmit 
// 16.13 next we fixe the date picker method
// head to common/form/dateInput

class BasicPage extends Component {
  render() {
    const { pristine, submitting, handleSubmit, updateProfile } = this.props;
    return (
      <Segment>
        <Header dividing size="large" content="Basics" />
        <Form onSubmit={handleSubmit(updateProfile)}>
          <Field
            width={8}
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Form.Group inline>
            <label>Gender: </label>
            <Field
              name="gender"
              type="radio"
              value="male"
              label="Male"
              component={RadioInput}
            />
            <Field
              name="gender"
              type="radio"
              value="female"
              label="Female"
              component={RadioInput}
            />
          </Form.Group>
          <Field 
            width={8}
            name='dateOfBirth'
            component={DateInput}
            placeholder='Date of Birth'
            dateFormat='dd LL yyyy'
            showYearDropdown={true}
            showMonthDropdown={true}
            dropdownMode='select'
            maxDate={addYears(new Date(), -18)}
          />
          <Field
            name="city"
            placeholder="Home Town"
            options={{ types: ["(cities)"] }}
            label="Female"
            component={PlaceInput}
            width={8}
          />
          <Divider />
          <Button
            disabled={pristine || submitting}
            size="large"
            positive
            content="Update Profile"
          />
        </Form>
      </Segment>
    );
  }
}
// 16.5 this component wont render the user data as placeholder text when it loads
// we must enable enableReinitialize : true in conecting this component to
// redux form
// 16.6 now lets create the radio buttons for gender. Head to Form folder/RadioInput.jsx
export default reduxForm({ 
  form: "userProfile", 
  enableReinitialize: true, 
  destroyOnUnmount: false 
})(BasicPage);
