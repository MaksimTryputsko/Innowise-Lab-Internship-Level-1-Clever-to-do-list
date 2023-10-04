import React from "react";
import styles from "./dayFromCalendar.module.scss";
import classNames from "classnames";

interface IPropsDayFromCalendar {
  dayNumber: number;
  dayName: string;
  completedTasks?: number;
  outstandingTasks?: number;
}

const DayFromCalendar = ({
  dayNumber,
  dayName,
  completedTasks,
  outstandingTasks,
}: IPropsDayFromCalendar) => {
  const classCompleted = classNames(styles.default, {
    [styles.completedTasksBlock]: !!completedTasks,
  });
  const classOutstanding = classNames(styles.default, {
    [styles.outstandingTasksBlock]: !!outstandingTasks,
  });
  return (
    <div>
      <div className={styles.wrapperForDay}>
        <div>{dayName}</div>
        <div>{dayNumber}</div>
      </div>
      <div className={styles.completedWrapper}>
        <div className={classCompleted}></div>
        <div className={classOutstanding}></div>
      </div>
    </div>
  );
};

export { DayFromCalendar };
