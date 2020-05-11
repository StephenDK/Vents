import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({
  input: { value, onChange, onBlur },
  width,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <DatePicker
        {...rest}
        placeholderText={placeholder}
        // 16.13 if value is an object that is not equL to some kind of date
        // then we know this is a firestore timestamp
        // if '[object Date]' is not a javascript date then we want to convert it 
        // to a date. toDate is a fisrestore functionality
        // id it is a date then we just want to pass it on
        // if we dont have a value at all then null
        // we are just testing to see if we have a javascript date/ firestore date
        // or nothing at all
        // 16.14 About Me page. head to AboutPage.jsx
        selected={
          value
            ? Object.prototype.toString.call(value) !== '[object Date]'
              ? value.toDate()
              : value
            : null
        }
        onChange={onChange}
        onBlur={(e, val) => onBlur(val)}
        onChangeRaw={e => e.preventDefault()}
      />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;