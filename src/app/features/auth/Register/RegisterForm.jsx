import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../common/form/TextInput'
// 15.9 first import connect and connect component to the store
// and the new registerUser auth action
import { connect } from 'react-redux';
import { registerUser } from '../authActions';

const mapDispatchToProps = {
  registerUser
};

const RegisterForm = ({handleSubmit, registerUser}) => {
  return (
    <div>
      <Form size="large" autoComplete='off' onSubmit={handleSubmit(registerUser)}>
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          <Button fluid size="large" color="teal">
            Register
          </Button>
        </Segment>
      </Form>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(reduxForm({form: 'registerForm'})(RegisterForm));