import React, { ChangeEventHandler } from "react";
import InputMUI from "@mui/joy/Input";

interface IPropsInput {
  placeholder: string;
  task: string;
  setTask: ChangeEventHandler<HTMLInputElement>;
}
const Input = ({ task, setTask, placeholder }: IPropsInput) => {
  return (
    <InputMUI
      placeholder={placeholder}
      variant="outlined"
      color="neutral"
      value={task}
      onChange={setTask}
    />
  );
};

export { Input };
