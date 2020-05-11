// 16.15 this is the skeleton for the about page
// next head over to the settingsDashboard to pass in 
// the initial values into the form.

import React from 'react';
import { Button, Divider, Form, Header, Segment } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import RadioInput from '../../../common/form/RadioInput';
import TextInput from '../../../common/form/TextInput';
import TextArea from '../../../common/form/TextArea';
import PlaceInput from '../../../common/form/PlaceInput';
import SelectInput from '../../../common/form/SelectInput';

const interests = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' }
];
// 16.17 hooking up the form
// bring in the handleSubmit method from redux form and the 
// updateProfile action to update the user profile
const AboutPage = ({ pristine, submitting, handleSubmit, updateProfile }) => {
  return (
    <Segment>
      <Header dividing size="large" content="About Me" />
      <p>Complete your profile to get the most out of this site</p>
      <Form onSubmit={handleSubmit(updateProfile)}>
        <Form.Group inline>
          <label>Tell us your status: </label>
          <Field name="status" component={RadioInput} type="radio" value="single" label="Single" />
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="relationship"
            label="Relationship"
          />
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="married"
            label="Married"
          />
        </Form.Group>
        <Divider />
        <label>Tell us about yourself</label>
        <Field name="about" component={TextArea} placeholder="About Me" />
        <Field
          name="interests"
          component={SelectInput}
          options={interests}
          value="interests"
          multiple={true}
          placeholder="Select your interests"
        />
        <Field
          width={8}
          name="occupation"
          type="text"
          component={TextInput}
          placeholder="Occupation"
        />
        <Field
          width={8}
          name="origin"
          options={{ types: ['(regions)'] }}
          component={PlaceInput}
          placeholder="Country of Origin"
        />
        <Divider />
        <Button disabled={pristine || submitting} size="large" positive content="Update Profile" />
      </Form>
    </Segment>
  );
};
// 16.18 when the component unmounts redux form destroys the data.
// so when we switch between other components the data wont persist
// back into the form fields. The destroyOnUnmount set to false preserves 
// the form values. Add to the basic page as well
export default reduxForm({ 
    form: 'userProfile', 
    enableReinitialize: true, 
    destroyOnUnmount: false
 })(AboutPage);