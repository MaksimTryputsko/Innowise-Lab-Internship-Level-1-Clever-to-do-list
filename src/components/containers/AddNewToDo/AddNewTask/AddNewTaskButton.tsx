import React, { useState } from "react";
import styles from "./addNewTask.module.scss";
import { Modal } from "components/shared/ModalAddNewTask/Modal";
import { AddNewTaskBlock } from "../AddNewTaskBlock/AddNewTaskBlock";
import { Button } from "components/shared/Button/Button";

const AddNewTaskButton = () => {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClickSetOpen = () => {
    setOpen(false);
  };
  return (
    <div className={styles.addNewTaskBlockButton}>
      <div className={styles.wrapperForButton}>
        <Button variant="contained" onClick={handleClick}>
          + Add a New Task
        </Button>
        <Modal isOpen={isOpen} onClose={handleClickSetOpen}>
          <AddNewTaskBlock onClose={handleClickSetOpen} />
        </Modal>
      </div>
    </div>
  );
};

export { AddNewTaskButton };
