import React from "react";
import { Form, Label } from "semantic-ui-react";

// 9.4 The textfied componwnt will be a stateless component
// but we are going to pass some properties from redux-form into it.
const TextInput = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error }
}) => {
    // 9.5 the props above are availabe in this component
    // Below if their is an error object the !! returns a boolean
    // Normally the error is an object
  return (
      <Form.Field error={touched && !!error}>
          {/* 9.6 Spreading the input below gives access to onChange, onBlur and more */}
          <input {...input} placeholder={placeholder} type={type} />
          {/* 9.7 below we can output a label if their is an error */}
          {touched && error && <Label basic color='red'>{error}</Label>}
      </Form.Field>
  );
};
// 9.8 This is now a reusable component. head back to the eventForm and
// import it

export default TextInput;
