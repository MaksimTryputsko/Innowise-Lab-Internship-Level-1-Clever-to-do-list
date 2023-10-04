import React, { useEffect, useMemo } from "react";
import styles from "./tasksForToDay.module.scss";
import { AddNewTaskButton } from "Components/containers/AddNewToDo/AddNewTask/AddNewTaskButton";
import { useAuthor } from "hooks/useAuth";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToDoElement } from "../ToDoElement/ToDoElement";
import { ITask, sagaGetToDo } from "store/reducers/toDosListReducer";
import { useToDosList } from "hooks/useToDosList";
import { arrayDaysFromToDay } from "functions/getDays";
import { CaptionForTasksBlock } from "../CaptionForTasksBlock/CaptionForTasksBlock";

const TasksForToday = () => {
  const { email, id } = useAuthor();
  const dispatch = useDispatch();
  const { pageId } = useParams();
  const { toDos } = useToDosList();

  const daysInMonth = arrayDaysFromToDay();

  const getDate = useMemo(() => {
    if (pageId) {
      const test = daysInMonth.find(el => el.number === Number(pageId));
      return test;
    }
  }, [pageId]);

  useEffect(() => {
    if (pageId) {
      dispatch(sagaGetToDo({ userId: `${id}`, pageId: pageId }));
    }
  }, [pageId]);
  return (
    <div className={styles.blockTasksForToday}>
      {!pageId || parseInt(pageId) > 31 ? (
        <h1> {email} choose the day, please</h1>
      ) : (
        getDate &&
        email && <CaptionForTasksBlock date={getDate} email={email} />
      )}

      {toDos?.map((task: ITask) => {
        return (
          <ToDoElement
            task={task.task}
            key={task.id}
            completed={task.completed}
            description={task.description}
            taskId={task.id}
          />
        );
      })}
      {pageId && <AddNewTaskButton />}
    </div>
  );
};

export { TasksForToday };
