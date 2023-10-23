import React, { useContext } from "react";
import styles from "./header.module.scss";
import { useAuth } from "hooks/useAuth";
import { removeUser } from "store/reducers/userReducer/actions";
import { useDispatch } from "react-redux";

import { IThemeContext, ThemeContext } from "providers/ThemeProvider";
import { Button } from "components/shared/Button/Button";

const Header = () => {
  const dispatch = useDispatch();
  const { email } = useAuth();

  const handleClickRemoveUser = () => {
    dispatch(removeUser());
  };
  const { changeTheme } = useContext(ThemeContext) as IThemeContext;

  return (
    <div className={styles.header}>
      <div>
        <img
          src="https://logopond.com/logos/f0a1e056385d86e3655a8c299611f6c8.png"
          alt="logo"
          className={styles.headerLogo}
        />
        <h1>Hello {email}</h1>
      </div>
      <Button onClick={handleClickRemoveUser} variant="contained">
        Log out from {email}
      </Button>
      <Button variant="contained" onClick={changeTheme}>
        Change Theme
      </Button>
    </div>
  );
};

export { Header };
