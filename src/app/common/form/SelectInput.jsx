import React from "react";
import { Form, Label, Select } from "semantic-ui-react";

// 9.11 pass in almpst the same props
const SelectInput = ({
  input,
  type,
  placeholder,
  multiple,
  options,
  meta: { touched, error },
}) => {
  //console.log(input);
  return (
    <Form.Field error={touched && !!error}>
      <Select
        value={input.value || null}
        // 9.12 the onChange below sets the value in input to the users selection
        // or null if the user selects nothing. Without this the selection would break
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={placeholder}
        options={options}
        multiple={multiple}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

// 9.13 last import component into eventForm

export default SelectInput;
