import React, { useMemo, useState } from "react";
import styles from "./addNewTaskBlock.module.scss";
import { useAuth } from "hooks/useAuth";
import { useDispatch } from "react-redux";
import {
  getToDosListSagaForMonths,
  sagaSetToDo,
} from "store/reducers/toDoListReducer/actions";
import { Input } from "components/shared/Input";
import { InputDate } from "components/shared/InputDate";
import { arrayDaysFromToDay } from "functions/getDays";
import { useParams } from "react-router-dom";
import { useToDosList } from "hooks/useToDosList";
import { shouldUpdateTask } from "functions/shouldUpdateTask";
import { nanoid } from "nanoid/non-secure";
import { Button } from "components/shared/Button/Button";

interface IPropsAddNewTaskBlock {
  onClose: () => void;
}

const AddNewTaskBlock = ({ onClose }: IPropsAddNewTaskBlock) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const { pageId } = useParams();
  const { id } = useAuth();
  const dispatch = useDispatch();
  const { toDosForMonth } = useToDosList();
  const daysArray = useMemo(
    () => arrayDaysFromToDay().map(el => `${el.number}`),
    [],
  );

  const buttonText = useMemo(() => {
    if (shouldUpdateTask(toDosForMonth, date, task).update) {
      return "UPDATE TASK";
    }
    return "SAVE TASK";
  }, [task]);

  const handleClickSetNewTask = () => {
    if (!pageId || !id) {
      return;
    }
    const shouldUpdate = shouldUpdateTask(toDosForMonth, date, task);
    const generateId = nanoid(10);
    const taskForServer = {
      task,
      description,
      completed: false,
      id: generateId,
    };
    dispatch(
      sagaSetToDo({
        userId: `${id}`,
        taskForServer,
        date,
        pageId,
        shouldUpdate,
      }),
    );
    dispatch(getToDosListSagaForMonths(id));
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
              task={task}
              onChange={onChangeHandlerNameTask}
            />
            <Input
              placeholder={"Set description for your task"}
              task={description}
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
