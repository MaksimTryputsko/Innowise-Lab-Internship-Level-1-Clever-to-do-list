import React, { useMemo } from "react";
import styles from "./tasksForToDay.module.scss";
import { AddNewTaskButton } from "components/containers/AddNewToDo/AddNewTask/AddNewTaskButton";
import { useAuth } from "hooks/useAuth";
import { useParams } from "react-router-dom";
import { ToDoElement } from "../ToDoElement/ToDoElement";
import { ITask } from "constants/interfaces";
import { arrayDaysFromToday } from "functions/getDays";
import { CaptionForTasksBlock } from "../CaptionForTasksBlock/CaptionForTasksBlock";
import { useTodos } from "store/todosStore";

const TasksForToday = () => {
  const { email } = useAuth();
  const { pageId } = useParams();
  const daysInMonth = arrayDaysFromToday();
  const { todos } = useTodos();

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

  const todosList = useMemo(() => {
    return todos.filter(todo => todo.date === pageId);
  }, [pageId, todos]);

  return (
    <div className={styles.blockTasksForToday}>
      {dateHeader}
      {todosList.map((task: ITask) => {
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
