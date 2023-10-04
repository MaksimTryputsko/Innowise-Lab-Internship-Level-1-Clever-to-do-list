import React, { useState } from "react";
import styles from "./addNewTask.module.scss";
import { Modal } from "Components/Shared/ModalAddNewTask/Modal";
import { AddNewTaskBlock } from "../AddNewTaskBlock/AddNewTaskBlock";

const AddNewTaskButton = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClickSetOpen = () => {
    setOpen(false);
  };
  return (
    <div className={styles.addNewTaskBlockButton}>
      <div>
        <button onClick={handleClick}>+ Add a New Task</button>
        <Modal open={open} onClose={handleClickSetOpen}>
          <AddNewTaskBlock onClose={handleClickSetOpen} />
        </Modal>
      </div>
    </div>
  );
};

export { AddNewTaskButton };
