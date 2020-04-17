import React from 'react'
import { Form, Label } from 'semantic-ui-react';

// 9.9 import the same props as the TextInput component
// Both components look pretty much the same
const TextArea = ({
    input,
    rows,
    width,
    type,
    placeholder,
    meta: { touched, error }
  }) => {
    return (
        <Form.Field error={touched && !!error}>
            <textarea {...input} placeholder={placeholder} type={type} rows={rows}/>
            {touched && error && <Label basic color='red'>{error}</Label>}
        </Form.Field>
    )
}

// 9.10 Now import this component into the eventForm component
export default TextArea;