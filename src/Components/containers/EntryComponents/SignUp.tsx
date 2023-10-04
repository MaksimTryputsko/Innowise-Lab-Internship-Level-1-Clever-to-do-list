import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sagaRegistrationUser } from "store/reducers/userReducer";
import { Form } from "./Form";
import { useAuthor } from "hooks/useAuth";
import { getTodayDay } from "functions/getTodayDay";
import { HOME_PAGE } from "constants/routes";

const SignUp: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuthor();
  const today = getTodayDay();

  const handleRegister = (email: string, password: string) => {
    dispatch(sagaRegistrationUser({ email: email, password: password }));
  };

  if (isAuth) {
    navigate(`${HOME_PAGE + today}`);
  }
  return <Form title="register" handleClick={handleRegister} />;
});

SignUp.displayName = "SignUp";

export { SignUp };
