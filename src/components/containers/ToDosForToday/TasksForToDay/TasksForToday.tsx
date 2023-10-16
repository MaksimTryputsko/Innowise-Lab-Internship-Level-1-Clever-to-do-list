import React, { useEffect, useMemo } from "react";
import styles from "./tasksForToDay.module.scss";
import { AddNewTaskButton } from "components/containers/AddNewToDo/AddNewTask/AddNewTaskButton";
import { useAuth } from "hooks/useAuth";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToDoElement } from "../ToDoElement/ToDoElement";
import { ITask, sagaGetToDo } from "store/reducers/toDoListReducer/actions";
import { useToDosList } from "hooks/useToDosList";
import { arrayDaysFromToDay } from "functions/getDays";
import { CaptionForTasksBlock } from "../CaptionForTasksBlock/CaptionForTasksBlock";

const TasksForToday = () => {
  const { email, id } = useAuth();
  const dispatch = useDispatch();
  const { pageId } = useParams();
  const { toDos } = useToDosList();
  const daysInMonth = arrayDaysFromToDay();

  const currentDate = useMemo(() => {
    if (pageId) {
      return daysInMonth.find(el => el.number === Number(pageId));
    }
  }, [pageId]);

  const dateHeader = useMemo(() => {
    if (!pageId || parseInt(pageId) > 31) {
      return <h1> {email} choose the day, please</h1>;
    }

    if (currentDate && email) {
      return <CaptionForTasksBlock date={currentDate} email={email} />;
    }

    return null;
  }, [pageId]);

  useEffect(() => {
    if (!pageId) {
      return;
    }
    dispatch(sagaGetToDo({ userId: `${id}`, day: pageId }));
  }, [pageId]);

  return (
    <div className={styles.blockTasksForToday}>
      {dateHeader}
      {[...toDos].map((task: ITask) => {
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
