import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { LOGIN_PAGE } from "constants/routes";
import { Header } from "components/containers/Header/Header";
import { Calendar } from "components/containers/CalendarBlock/Calendar/Calendar";
import { TasksForToday } from "components/containers/ToDosForToday/TasksForToDay/TasksForToday";

const HomePage = () => {
  const { isAuth } = useAuth();
  if (!isAuth) {
    return <Navigate to={LOGIN_PAGE} />;
  }
  return (
    <div>
      <Header />
      <Calendar />
      <TasksForToday />
    </div>
  );
};

export { HomePage };
