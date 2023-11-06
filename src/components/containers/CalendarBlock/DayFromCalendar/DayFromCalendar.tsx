import React from "react";
import styles from "./dayFromCalendar.module.scss";
import { ITask } from "constants/interfaces";

interface IPropsDayFromCalendar {
  dayNumber: number;
  dayName: string;
  todos: ITask[];
}

const DayFromCalendar = ({
  dayNumber,
  dayName,
  todos,
}: IPropsDayFromCalendar) => {
  const taskStatuses = todos.filter(day => day.date === dayNumber.toString());

  return (
    <div className={styles.blockDayCalendar}>
      <div className={styles.completedTasksBlock}>
        {taskStatuses?.map(taskStatus => {
          return taskStatus.completed ? (
            <span key={taskStatus.id} className={styles.completedStatus}></span>
          ) : null;
        })}
      </div>
      <div className={styles.wrapperForDay}>
        <div>{dayName}</div>
        <div>{dayNumber}</div>
      </div>
      <div className={styles.unfulfilledTasksBlock}>
        {taskStatuses?.map(taskStatus => {
          return taskStatus.completed ? null : (
            <span
              key={taskStatus.id}
              className={styles.unfulfilledStatus}></span>
          );
        })}
      </div>
    </div>
  );
};

export { DayFromCalendar };
