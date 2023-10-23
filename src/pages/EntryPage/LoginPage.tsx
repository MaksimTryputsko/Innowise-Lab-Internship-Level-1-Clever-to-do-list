import { Login } from "components/containers/EntryComponents/Login";
import { REGISTER_PAGE } from "constants/routes";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.scss";
import { Button } from "components/shared/Button/Button";

const LoginPage = React.memo(() => {
  return (
    <div className={styles.mainBlock}>
      <h1>Login</h1>
      <div className={styles.entryToApp}>
        <Login />
      </div>
      <div className={styles.blockChangePage}>
        <span>{`You don't have account ?`}</span>
        <Link to={REGISTER_PAGE}>
          <Button variant="contained">Register</Button>
        </Link>
      </div>
    </div>
  );
});

LoginPage.displayName = "LoginPage";

export { LoginPage };
