// import React from "react";
// import { Form, Label } from "semantic-ui-react";
// import DatePicker from "react-datepicker";
// import 'react-datepicker/dist/react-datepicker.css'; //path the datepicker styles

// // 9.16 import the redux form helper methods from props. The ...rest is the rest
// // of the properties passed to our component
// export const DateInput = ({
//   input,
//   width,
//   placeholder,
//   meta: { touched, error },
//   ...rest
// }) => {
//   return (
//     <Form.Field error={touched && !!error}>
//       <DatePicker
//       //the ...rest is for the properties we pass into the datepicker compnent
//       // without havin g to write all of them out
//         {...rest}
//         placeholderText={placeholder}
//         //The selected property adds the selected date into the date picker
//         // If there is a value make it into a javascript object with new Date
//         selected={input.value ? new Date(input.value) : null}
//         // the onChange is from redux form to be aware of when were picking something
//         onChange={input.onChange}
//         // for validation redux does not know if we clicked out of date input filed
//         // so use onBlur
//         onBlur={input.onBlur}
//         // Without the onChangeRaw the user can type in the date field and crash
//         // the app. the e.preventDefault stops input in the date field
//         onChangeRaw={(e) => e.preventDefault()}
//       />
//       {touched && error && (
//         <Label basic color="red">
//           {error}
//         </Label>
//       )}
//     </Form.Field>
//   );
// };

// export default DateInput;
// //9.17 Last import this component into the eventForm
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