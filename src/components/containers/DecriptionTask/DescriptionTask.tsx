import React from "react";
import styles from "./descriptionBlock.module.scss";

interface IPropsDescriptionTask {
  description: string;
  taskName: string;
}
const DescriptionTask = ({ description, taskName }: IPropsDescriptionTask) => {
  return (
    <div className={styles.descriptionBlock}>
      <h1>{taskName}</h1>
      <span className={styles.description}>{description}</span>
    </div>
  );
};

export { DescriptionTask };
