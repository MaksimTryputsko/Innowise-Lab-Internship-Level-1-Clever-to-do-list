import React from "react";
import CheckboxFromMUI from "@mui/material/Checkbox";

interface IPropsCheckBox {
  completed: boolean;
  setCompleted: () => void;
}
const CheckBox = ({ completed, setCompleted }: IPropsCheckBox) => {
  return <CheckboxFromMUI checked={completed} onChange={setCompleted} />;
};

export { CheckBox };
