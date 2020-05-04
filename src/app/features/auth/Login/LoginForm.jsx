import React from "react";
import { Form, Segment, Button, Label } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { login } from "../authActions";
import TextInput from "../../../common/form/TextInput";
import { connect } from "react-redux";

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
        {error && <Label basic color='red'>{error}</Label>}
        <Button fluid size="large" color="teal">
          Login
        </Button>
      </Segment>
    </Form>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: "loginForm" })(LoginForm));
