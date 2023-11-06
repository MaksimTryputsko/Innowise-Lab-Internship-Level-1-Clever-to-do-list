import { todosService } from "services/TodosService";
import { create } from "zustand";
import { ITask } from "constants/interfaces";

interface IShouldUpdate {
  findId: string | null;
  update: boolean;
}

interface IUseTodos {
  todos: ITask[];
  getTodosForMonth: (userId: string) => void;
  addTodo: (
    userId: string,
    date: string,
    task: ITask,
    pageId: string,
    shouldUpdate: IShouldUpdate,
  ) => void;
  removeTodo: (userId: string, taskId: string, numberDay: string) => void;
  changeStatus: (
    id: string,
    pageId: string,
    taskId: string,
    task: ITask,
  ) => void;
}

export const useTodos = create<IUseTodos>(set => ({
  todos: [],

  getTodosForMonth: async (userId: string) => {
    const result = await todosService.getTasksForMonths(userId);
    set(state => {
      return {
        todos: [...result],
      };
    });
  },

  addTodo: async (userId, date, task, pageId, shouldUpdate) => {
    const { findId, update } = shouldUpdate;
    const id = update ? findId : task.id;
    await todosService.saveTask(date, userId, `${id}`, task);

    if (update) {
      return set(state => {
        return {
          todos: state.todos.map(todo =>
            todo.id === findId
              ? { ...todo, description: task.description }
              : todo,
          ),
        };
      });
    }

    return set(state => {
      return {
        todos: [task, ...state.todos],
      };
    });
  },

  removeTodo: async (userId, taskId, numberDay) => {
    await todosService.removeTask(userId, numberDay, taskId);
    return set(state => {
      return {
        todos: state.todos.filter(todo => todo.id !== taskId),
      };
    });
  },

  changeStatus: async (
    id: string,
    pageId: string,
    taskId: string,
    task: ITask,
  ) => {
    todosService.changeTaskStatus(id, pageId, taskId, task);
    return set(state => {
      return {
        todos: state.todos.map(todo =>
          todo.id === taskId ? { ...todo, completed: !todo.completed } : todo,
        ),
      };
    });
  },
}));
