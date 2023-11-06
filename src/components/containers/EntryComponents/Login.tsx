import React from "react";
import { Form } from "./Form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { getTodayDay } from "functions/getTodayDay";
import { HOME_PAGE } from "constants/routes";
import { useAuthUser } from "store/authStore";

const Login: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const today = getTodayDay();
  const { loginUser } = useAuthUser();

  const handleLogin = (email: string, password: string) => {
    loginUser(email, password);
  };

  if (isAuth) {
    navigate(`${HOME_PAGE + today}`);
  }
  return <Form title="Sign in" handleClick={handleLogin} />;
});

Login.displayName = "Login";

export { Login };
