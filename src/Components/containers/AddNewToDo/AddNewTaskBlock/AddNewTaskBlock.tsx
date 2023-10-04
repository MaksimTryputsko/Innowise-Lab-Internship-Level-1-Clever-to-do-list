import React, { useMemo, useState } from "react";
import styles from "./addNewTaskBlock.module.scss";
import { useAuthor } from "hooks/useAuth";
import { useDispatch } from "react-redux";
import {
  getToDosListSagaForMonths,
  sagaSetToDo,
} from "store/reducers/toDosListReducer";
import { Input } from "Components/Shared/Input";
import { InputDate } from "Components/Shared/InputDate";
import { arrayDaysFromToDay } from "functions/getDays";
import { useNavigate, useParams } from "react-router-dom";
import { useToDosList } from "hooks/useToDosList";
import { HOME_PAGE } from "constants/routes";
import { shouldUpdateTask } from "functions/shouldUpdateTask";
import { nanoid } from "nanoid/non-secure";

interface IPropsAddNewTaskBlock {
  onClose: () => void;
}

const AddNewTaskBlock = ({ onClose }: IPropsAddNewTaskBlock) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const { pageId } = useParams();
  const { id } = useAuthor();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toDosForMonth } = useToDosList();

  const daysArray = useMemo(
    () => arrayDaysFromToDay().map(el => `${el.number}`),
    [],
  );

  const handleClickSetNewTask = () => {
    const shouldUpdate = shouldUpdateTask(toDosForMonth, date, task);
    const generateId = nanoid(10);
    const taskForServer = {
      task,
      description,
      completed: false,
      id: generateId,
    };

    if (pageId && id) {
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
    }
    onClose();
  };
  return (
    <div>
      <div className={styles.newTaskBlock}>
        <div className={styles.descriptionBlock}>
          <InputDate
            setDate={e => setDate(e.target.innerHTML)}
            days={daysArray}
          />
          <div className={styles.taskBlock}>
            <Input
              placeholder={"Write yor task"}
              task={task}
              setTask={e => {
                setTask(e.target.value);
              }}
            />
            <Input
              placeholder={"Set description for your task"}
              task={description}
              setTask={e => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <button onClick={handleClickSetNewTask}>SAVE / UPDATE your task</button>
      </div>
    </div>
  );
};

export { AddNewTaskBlock };
