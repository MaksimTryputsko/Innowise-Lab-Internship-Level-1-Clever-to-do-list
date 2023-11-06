import { ITask } from "constants/interfaces";

export const shouldUpdateTask = (todos: ITask[], day: string, task: string) => {
  const filterTodos = todos.filter(todo => todo.date === day);
  const todo = filterTodos.find(todo => todo.task === task);

  if (!todo) {
    return { findId: null, update: false };
  }

  return { findId: todo.id, update: true };
};
