import React, { Dispatch, SetStateAction, useContext } from "react";
import styles from "./header.module.scss";
import { useAuth } from "hooks/useAuth";
import { removeUser } from "store/reducers/userReducer/actions";
import { useDispatch } from "react-redux";
import {
  DARK_THEME,
  KEY_THEME_LOCALSTORAGE,
  LIGHT_THEME,
} from "constants/valuesTheme";
import { ThemeContext } from "providers/ThemeProvider";
import { Button } from "components/shared/Button/Button";

const Header = () => {
  const dispatch = useDispatch();
  const { email } = useAuth();

  const handleClickRemoveUser = () => {
    dispatch(removeUser());
  };

  const [theme, setTheme] = useContext(ThemeContext) as (string &
    Dispatch<SetStateAction<string>>)[];

  const changeTheme = () => {
    setTheme(theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME);
    localStorage.setItem(
      KEY_THEME_LOCALSTORAGE,
      theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME,
    );
  };

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
