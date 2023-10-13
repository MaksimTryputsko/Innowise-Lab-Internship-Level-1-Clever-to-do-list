import { Button } from "components/shared/Button/Button";
import { FormInput } from "components/shared/FormInput";
import React, { useState } from "react";

interface IFormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

const Form = ({ title, handleClick }: IFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (text: string) => {
    setEmail(text);
  };
  const onChangePassword = (text: string) => {
    setPassword(text);
  };
  const handleClickButton = () => {
    handleClick(email, password);
  };

  return (
    <div>
      <FormInput
        type="email"
        value={email}
        placeholder="email"
        onChange={onChangeEmail}
      />
      <FormInput
        type="password"
        value={password}
        onChange={onChangePassword}
        placeholder="password"
      />
      <Button variant="contained" onClick={handleClickButton}>
        {title}
      </Button>
    </div>
  );
};

export { Form };
