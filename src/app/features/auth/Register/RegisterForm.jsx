import React from "react";
import { Form, Segment, Button, Label } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../common/form/TextInput";
// 15.9 first import connect and connect component to the store
// and the new registerUser auth action
import { connect } from "react-redux";
import { registerUser } from "../authActions";
// 15.11 bring in combine validators
import { combineValidators, isRequired } from "revalidate";

const mapDispatchToProps = {
  registerUser,
};

//15.12 setip for revalidate
const validate = combineValidators({
  displayName: isRequired("displayName"),
  email: isRequired("email"),
  password: isRequired("password"),
});
// after add validate object to the redux form in connect

const RegisterForm = ({ handleSubmit, registerUser, error, invalid, submitting }) => {
  return (
    <div>
      <Form
        size="large"
        autoComplete="off"
        onSubmit={handleSubmit(registerUser)}
      >
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
          {error && <Label basic color='red'>{error}</Label>}
          <Button disabled={invalid || submitting}fluid size="large" color="teal">
            Register
          </Button>
        </Segment>
      </Form>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: "registerForm", validate })(RegisterForm));
