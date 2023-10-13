import React, { useState } from "react";
import styles from "./toDoElement.module.scss";
import { CheckBox } from "components/shared/CheckBox/CheckBox";
import { useParams } from "react-router-dom";
import { Modal } from "components/shared/ModalAddNewTask/Modal";
import { DescriptionTask } from "components/containers/DecriptionTask/DescriptionTask";

import { useAuth } from "hooks/useAuth";
import { useDispatch } from "react-redux";
import {
  removeSagaToDos,
  sagaChangeCompleted,
} from "store/reducers/toDoListReducer/actions";
import { DeleteIcon } from "components/shared/DeleteIcon";
import { Button } from "components/shared/Button/Button";

interface IPropsToDoElement {
  task: string;
  completed: boolean;
  description: string;
  taskId: string;
}

const ToDoElement = ({
  task,
  completed,
  description,
  taskId,
}: IPropsToDoElement) => {
  const [isChecked, setChecked] = useState(completed);
  const [isOpen, setOpen] = useState(false);
  const { id } = useAuth();
  const { pageId } = useParams();

  const dispatch = useDispatch();
  const handleRemoveClick = () => {
    if (pageId && id) {
      dispatch(removeSagaToDos({ userId: id, id: taskId, numberDay: pageId }));
    }
  };

  const handleClickChangeCompleted = () => {
    if (!pageId || !id) {
      return;
    }
    const toDo = {
      task,
      completed: !isChecked,
      description,
      taskId,
      id: taskId,
    };
    dispatch(sagaChangeCompleted({ id, pageId, taskId, task: toDo }));
    setChecked(!isChecked);
  };
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <div className={styles.todoElementWrapper}>
      <div className={styles.toDoElement}>
        <div>
          <CheckBox
            isChecked={isChecked}
            onChange={handleClickChangeCompleted}
          />
          <span>{task}</span>
        </div>
        <div className={styles.descriptionBlock}>
          <Button variant="contained" onClick={openModal}>
            Description
          </Button>
          <Modal isOpen={isOpen} onClose={closeModal}>
            <DescriptionTask description={description} taskName={task} />
          </Modal>
          <span>
            <DeleteIcon onClick={handleRemoveClick} />
          </span>
        </div>
      </div>
    </div>
  );
};

export { ToDoElement };
