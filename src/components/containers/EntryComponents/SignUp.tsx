import React from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "./Form";
import { useAuth } from "hooks/useAuth";
import { getTodayDay } from "functions/getTodayDay";
import { HOME_PAGE } from "constants/routes";
import { useAuthUser } from "store/authStore";

const SignUp: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const today = getTodayDay();
  const { registerUser } = useAuthUser();

  const handleRegister = (email: string, password: string) => {
    registerUser(email, password);
  };

  if (isAuth) {
    navigate(`${HOME_PAGE + today}`);
  }
  return <Form title="register" handleClick={handleRegister} />;
});

SignUp.displayName = "SignUp";

export { SignUp };
