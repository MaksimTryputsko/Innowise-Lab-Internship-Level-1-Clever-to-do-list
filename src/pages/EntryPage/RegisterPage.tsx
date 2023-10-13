import { LOGIN_PAGE } from "constants/routes";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.scss";
import { SignUp } from "components/containers/EntryComponents/SignUp";
import { Button } from "components/shared/Button/Button";

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
          <Button variant="contained">Sign in</Button>
        </Link>
      </div>
    </div>
  );
});

RegisterPage.displayName = "RegisterPage";

export { RegisterPage };
