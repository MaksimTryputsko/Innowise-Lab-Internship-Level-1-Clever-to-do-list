import React from "react";
import styles from "./dayFromCalendar.module.scss";
import { ITask } from "store/reducers/toDoListReducer/actions";

interface IPropsDayFromCalendar {
  dayNumber: number;
  dayName: string;
  taskStatuses?: ITask[];
}

const DayFromCalendar = ({
  dayNumber,
  dayName,
  taskStatuses,
}: IPropsDayFromCalendar) => {
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
