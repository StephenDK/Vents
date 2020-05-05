import React from "react";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { login } from "../authActions";
import TextInput from "../../../common/form/TextInput";
import { connect } from "react-redux";

// 15.14 bring in Divider from semantic ui and the social login component
// also add the social component to registerForm
import SocialLogin from '../SocialLogin/SocialLogin';

const mapDispatchToProps = {
  login,
};

// 15.3 since our form is already conect to redux-form bring in the error
// property from redux form
const LoginForm = ({ login, handleSubmit, error }) => {
  return (
    <Form size="large" onSubmit={handleSubmit(login)} autoComplete='off'>
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        {/* Below we output a label with the error message from redux-form
          if an error exists.
          15.4 using firebase to signout head to NavBar.jsx
        */}
        {error && <Label basic color='red'>{error}</Label>}
        <Button fluid size="large" color="teal">
          Login
        </Button>
        <Divider horizontal>
          Or
        </Divider>
        <SocialLogin />
      </Segment>
    </Form>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: "loginForm" })(LoginForm));
