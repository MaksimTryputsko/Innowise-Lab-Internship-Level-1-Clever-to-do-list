import React from "react";
import styles from "./dayFromCalendar.module.scss";
import { ITask } from "store/reducers/toDoListReducer/actions";

interface IPropsDayFromCalendar {
  dayNumber: number;
  dayName: string;
  tasksStatus?: ITask[];
}

const DayFromCalendar = ({
  dayNumber,
  dayName,
  tasksStatus,
}: IPropsDayFromCalendar) => {
  return (
    <div className={styles.blockDayCalendar}>
      <div className={styles.completedTasks}>
        {tasksStatus &&
          tasksStatus.map(el => {
            return el.completed ? <span key={el.id}></span> : null;
          })}
      </div>
      <div className={styles.wrapperForDay}>
        <div>{dayName}</div>
        <div>{dayNumber}</div>
      </div>
      <div className={styles.unfulfilledTasks}>
        {tasksStatus &&
          tasksStatus.map(el => {
            return el.completed ? null : <span key={el.id}></span>;
          })}
      </div>
    </div>
  );
};

export { DayFromCalendar };
