import React from "react";
import styles from "./header.module.scss";
import { useAuth } from "hooks/useAuth";
import { IThemeContext, useThemeContext } from "providers/ThemeProvider";
import { Button } from "components/shared/Button/Button";
import { useAuthUser } from "store/authStore";

const Header = () => {
  const { logOut } = useAuthUser();
  const { email } = useAuth();

  const handleClickRemoveUser = () => {
    logOut();
  };
  const { changeTheme } = useThemeContext() as IThemeContext;

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
