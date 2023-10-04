import React from "react";
import styles from "./header.module.scss";
import { useAuthor } from "hooks/useAuth";
import { removeUser } from "store/reducers/userReducer";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const { email } = useAuthor();

  const handleClickRemoveUser = () => {
    dispatch(removeUser());
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
      <button onClick={handleClickRemoveUser}>Log out from {email}</button>
    </div>
  );
};

export { Header };
