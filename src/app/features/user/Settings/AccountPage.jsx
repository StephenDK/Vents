import React from "react";
import {
  Segment,
  Header,
  Form,
  Divider,
  Label,
  Button,
  Icon,
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../common/form/TextInput";
// 15.19 we are going to setup the form to compare passwords
// so the user can chage their password
// import revalidate
import {
  combineValidators,
  matchesField,
  isRequired,
  composeValidators,
} from "revalidate";

// 15.20 no create our validator method
const validate = combineValidators({
  newPassword1: isRequired({ message: "Please enter a password" }),
  newPassword2: composeValidators(
    isRequired({ message: "Please confirm your new password" }),
    matchesField("newPassword1")({ message: "Passwords do not match" })
  )(),
});
// 15.20 now pass validate as an argument in redux form
// then disable the button if the form is inValid
// now we have to hookup the submit button to an action
// 12.21 head to authActions
const AccountPage = ({ error, invalid, submitting, handleSubmit, updatePassword }) => {
  return (
    <Segment>
      <Header dividing size="large" content="Account" />
      <div>
        <Header color="teal" sub content="Change password" />
        <p>Use this form to update your account settings</p>
        <Form onSubmit={handleSubmit(updatePassword)}>
          <Field
            width={8}
            name="newPassword1"
            type="password"
            pointing="left"
            inline={true}
            component={TextInput}
            basic={true}
            placeholder="New Password"
          />
          <Field
            width={8}
            name="newPassword2"
            type="password"
            inline={true}
            basic={true}
            pointing="left"
            component={TextInput}
            placeholder="Confirm Password"
          />
          {error && (
            <Label basic color="red">
              {error}
            </Label>
          )}
          <Divider />
          <Button
            disabled={invalid || submitting}
            size="large"
            positive
            content="Update Password"
          />
        </Form>
      </div>

      <div>
        <Header color="teal" sub content="Facebook Account" />
        <p>Please visit Facebook to update your account settings</p>
        <Button type="button" color="facebook">
          <Icon name="facebook" />
          Go to Facebook
        </Button>
      </div>

      <div>
        <Header color="teal" sub content="Google Account" />
        <p>Please visit Google to update your account settings</p>
        <Button type="button" color="google plus">
          <Icon name="google plus" />
          Go to Google
        </Button>
      </div>
    </Segment>
  );
};

export default reduxForm({ form: "account", validate })(AccountPage);
