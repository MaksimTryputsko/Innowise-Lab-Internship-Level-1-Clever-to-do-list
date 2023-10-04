import { LOGIN_PAGE } from "constants/routes";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.scss";
import { SignUp } from "Components/containers/EntryComponents/SignUp";

const RegisterPage = React.memo(() => {
  return (
    <div className={styles.mainBlock}>
      <h1>Register</h1>
      <div className={styles.entryToApp}>
        <SignUp />
      </div>
      <div className={styles.blockChangePage}>
        <span>Already have account ?</span>
        <Link to={LOGIN_PAGE}>
          <button>Sign in</button>
        </Link>
      </div>
    </div>
  );
});

RegisterPage.displayName = "RegisterPage";

export { RegisterPage };
