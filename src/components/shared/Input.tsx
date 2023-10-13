import React from "react";
import InputMUI from "@mui/joy/Input";

interface IPropsInput {
  placeholder: string;
  task: string;
  onChange: (text: string) => void;
}
const Input = ({ task, onChange, placeholder }: IPropsInput) => {
  const setText = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <InputMUI
      placeholder={placeholder}
      variant="outlined"
      color="neutral"
      value={task}
      onChange={setText}
    />
  );
};

export { Input };
