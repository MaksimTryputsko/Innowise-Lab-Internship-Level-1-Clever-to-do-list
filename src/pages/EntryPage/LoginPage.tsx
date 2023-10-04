import { Login } from "Components/containers/EntryComponents/Login";
import { REGISTER_PAGE } from "constants/routes";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.scss";

const LoginPage = React.memo(() => {
  return (
    <div className={styles.mainBlock}>
      <h1>Login</h1>
      <div className={styles.entryToApp}>
        <Login />
      </div>
      <div className={styles.blockChangePage}>
        <span>You don&#8217;t have account ?</span>
        <Link to={REGISTER_PAGE}>
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
});

LoginPage.displayName = "LoginPage";

export { LoginPage };
