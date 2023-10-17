import React, { useState } from "react";
import styles from "./addNewTask.module.scss";
import { Modal } from "components/shared/ModalAddNewTask/Modal";
import { AddNewTaskBlock } from "../AddNewTaskBlock/AddNewTaskBlock";
import { Button } from "components/shared/Button/Button";

const AddNewTaskButton = () => {
  const [isOpen, setOpen] = useState(false);
  const handleButtonClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.addNewTaskBlockButton}>
      <div className={styles.wrapperForButton}>
        <Button variant="contained" onClick={handleButtonClick}>
          + Add a New Task
        </Button>
        <Modal isOpen={isOpen} onClose={handleClose}>
          <AddNewTaskBlock onClose={handleClose} />
        </Modal>
      </div>
    </div>
  );
};

export { AddNewTaskButton };
