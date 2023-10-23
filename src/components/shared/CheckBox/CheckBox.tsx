import React from "react";
import CheckboxFromMUI from "@mui/material/Checkbox";

interface IPropsCheckBox {
  isChecked: boolean;
  onChange: () => void;
}

const CheckBox = ({ isChecked, onChange }: IPropsCheckBox) => {
  return <CheckboxFromMUI checked={isChecked} onChange={onChange} />;
};

export { CheckBox };
