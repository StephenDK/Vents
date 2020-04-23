import React from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { login } from "../authActions";
import TextInput from "../../../common/form/TextInput";
import { connect } from "react-redux";

const mapDispatchToProps = {
  login,
};

const LoginForm = ({ login, handleSubmit }) => {
  return (
    <Form error size="large" onSubmit={handleSubmit(login)} autoComplete='off'>
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
