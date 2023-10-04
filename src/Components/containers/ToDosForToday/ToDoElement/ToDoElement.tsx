import React, { useState } from "react";
import styles from "./toDoElement.module.scss";
import { CheckBox } from "Components/Shared/CheckBox/CheckBox";
import { useParams } from "react-router-dom";
import { Modal } from "Components/Shared/ModalAddNewTask/Modal";
import { DescriptionTask } from "Components/containers/DecriptionTask/DescriptionTask";
import { AiOutlineDelete } from "react-icons/ai";

import { useAuthor } from "hooks/useAuth";
import { useDispatch } from "react-redux";
import {
  removeSagaToDos,
  sagaChangeCompleted,
} from "store/reducers/toDosListReducer";
import { DeleteIcon } from "Components/Shared/DeleteIcon";

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
  const [value, setValue] = useState(completed);
  const [open, setOpen] = useState(false);
  const { id } = useAuthor();
  const { pageId } = useParams();

  const dispatch = useDispatch();
  const handleRemoveClick = () => {
    if (pageId && id) {
      dispatch(removeSagaToDos({ userId: id, id: taskId, numberDay: pageId }));
    }
  };

  const handleClickChangeCompleted = async () => {
    if (pageId && id) {
      const toDo = {
        task,
        completed: !value,
        description,
        taskId,
        id: taskId,
      };
      dispatch(sagaChangeCompleted({ id, pageId, taskId, task: toDo }));
      setValue(!value);
    }
  };

  return (
    <div className={styles.todoElementWrapper}>
      <div className={styles.toDoElement}>
        <div>
          <CheckBox
            completed={value}
            setCompleted={handleClickChangeCompleted}
          />
          <span>{task}</span>
        </div>
        <div className={styles.descriptionBlock}>
          <button onClick={() => setOpen(true)}>Description</button>
          <Modal open={open} onClose={() => setOpen(false)}>
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
