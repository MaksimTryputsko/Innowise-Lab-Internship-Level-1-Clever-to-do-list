import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthor } from "hooks/useAuth";
import { LOGIN_PAGE } from "constants/routes";
import { Header } from "Components/containers/Header/Header";
import { Calendar } from "Components/containers/CalendarBlock/Calendar/Calendar";
import { TasksForToday } from "Components/containers/ToDosForToday/TasksForToDay/TasksForToday";
import styles from "./homePage.module.scss";

const HomePage = () => {
  const { isAuth } = useAuthor();
  return isAuth ? (
    <div className={styles.test}>
      <Header />
      <Calendar />
      <TasksForToday />
    </div>
  ) : (
    <Navigate to={LOGIN_PAGE} />
  );
};

export { HomePage };
