import React from "react";
import {
  Input,
  Inputs,
  TextArea,
  Select,
  RadioButtons,
  CheckBoxes,
  SearchBox,
} from "./FormElements";

function FormControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "inputs":
      return <Inputs {...rest} />;
    case "textArea":
      return <TextArea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "checkbox":
      return <CheckBoxes {...rest} />;
    case "searchbox":
      return <SearchBox {...rest} />;
    default:
      return null;
  }
}
export default React.memo(FormControl);
