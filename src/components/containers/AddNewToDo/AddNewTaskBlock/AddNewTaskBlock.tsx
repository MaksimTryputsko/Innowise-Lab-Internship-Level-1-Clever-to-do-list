import React, { useMemo, useState } from "react";
import styles from "./addNewTaskBlock.module.scss";
import { useAuth } from "hooks/useAuth";
import { Input } from "components/shared/Input";
import { InputDate } from "components/shared/InputDate";
import { arrayDaysFromToday } from "functions/getDays";
import { useParams } from "react-router-dom";
import { shouldUpdateTask } from "functions/shouldUpdateTask";
import { nanoid } from "nanoid/non-secure";
import { Button } from "components/shared/Button/Button";
import { useTodos } from "store/todosStore";

interface IPropsAddNewTaskBlock {
  onClose: () => void;
}

const AddNewTaskBlock = ({ onClose }: IPropsAddNewTaskBlock) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const { pageId } = useParams();
  const { id } = useAuth();
  const { addTodo, todos } = useTodos();

  const daysArray = useMemo(
    () => arrayDaysFromToday().map(el => `${el.number}`),
    [],
  );

  const buttonText = useMemo(() => {
    if (shouldUpdateTask(todos, date, task).update) {
      return "UPDATE TASK";
    }
    return "SAVE TASK";
  }, [task]);

  const handleClickSetNewTask = () => {
    if (!pageId || !id) {
      return;
    }

    const shouldUpdate = shouldUpdateTask(todos, date, task);
    const generateId = nanoid(10);

    const taskForServer = {
      task,
      description,
      completed: false,
      id: generateId,
      date,
    };

    addTodo(`${id}`, date, taskForServer, pageId, shouldUpdate);
    onClose();
  };

  const onChangeHandlerNameTask = (text: string) => {
    setTask(text);
  };

  const onChangeHandlerDescriptionTask = (text: string) => {
    setDescription(text);
  };

  const onChangeSetDateTask = (date: string) => {
    setDate(date);
  };

  return (
    <div>
      <div className={styles.newTaskBlock}>
        <div className={styles.descriptionBlock}>
          <InputDate onChange={onChangeSetDateTask} days={daysArray} />
          <div className={styles.taskBlock}>
            <Input
              placeholder={"Write yor task"}
              value={task}
              onChange={onChangeHandlerNameTask}
            />
            <Input
              placeholder={"Set description for your task"}
              value={description}
              onChange={onChangeHandlerDescriptionTask}
            />
          </div>
        </div>
        <Button onClick={handleClickSetNewTask} variant="contained">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export { AddNewTaskBlock };
