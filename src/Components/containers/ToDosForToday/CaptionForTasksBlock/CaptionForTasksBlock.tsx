import React from "react";
import styles from "./captionForTasksBlock.module.scss";
import { IArrayDays } from "functions/convertArrayWithCompletedTask";

interface IPropsCaptionForTasksBlock {
  email: string;
  date: IArrayDays;
}

const CaptionForTasksBlock = ({ email, date }: IPropsCaptionForTasksBlock) => {
  return (
    <div className={styles.blockTasksForTodayName}>
      <div>
        <span className={styles.emailInformation}>{email}</span>, there are your
        tasks for:
      </div>
      <div className={styles.dateBlock}>
        <span>{date?.day}</span>
        <span>
          {date?.number}.{date?.month}.{date?.year}
        </span>
      </div>
    </div>
  );
};

export { CaptionForTasksBlock };
