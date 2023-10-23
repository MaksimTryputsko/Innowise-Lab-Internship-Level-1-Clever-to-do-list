import React from "react";
import InputMUI from "@mui/joy/Input";

interface IPropsInput {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
}
const Input = ({ value, onChange, placeholder }: IPropsInput) => {
  const setText = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <InputMUI
      placeholder={placeholder}
      variant="outlined"
      color="neutral"
      value={value}
      onChange={setText}
    />
  );
};

export { Input };
