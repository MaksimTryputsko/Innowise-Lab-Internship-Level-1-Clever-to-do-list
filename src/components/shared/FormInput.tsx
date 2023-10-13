import React from "react";

interface IPropsFormInput {
  type: string;
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
}
const FormInput = ({ type, value, onChange, placeholder }: IPropsFormInput) => {
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <input
      type={type}
      value={value}
      onChange={onChangeInput}
      placeholder={placeholder}
    />
  );
};

export { FormInput };
