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
    [styles.completedTasksBlock]: Boolean(completedTasks),
  });
  const classOutstanding = classNames(styles.default, {
    [styles.outstandingTasksBlock]: Boolean(outstandingTasks),
  });

  return (
    <div>
      <div className={styles.wrapperForValuesTasks}>
        <span> completed {completedTasks ? completedTasks : 0}</span>
        <span> outstanding {outstandingTasks ? outstandingTasks : 0}</span>
      </div>
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
