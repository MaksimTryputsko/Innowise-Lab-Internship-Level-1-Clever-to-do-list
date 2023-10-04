import React from "react";
import { Form } from "./Form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sagaLoginUser } from "store/reducers/userReducer";
import { useAuthor } from "hooks/useAuth";
import { getTodayDay } from "functions/getTodayDay";
import { HOME_PAGE } from "constants/routes";

const Login: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuthor();
  const today = getTodayDay();
  const handleLogin = (email: string, password: string) => {
    dispatch(sagaLoginUser({ email: email, password: password }));
  };

  if (isAuth) {
    navigate(`${HOME_PAGE + today}`);
  }
  return <Form title="sign in" handleClick={handleLogin} />;
});

Login.displayName = "Login";

export { Login };
