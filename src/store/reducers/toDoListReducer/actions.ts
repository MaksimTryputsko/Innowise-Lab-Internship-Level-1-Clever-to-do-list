import {
  GET_TODO,
  GET_TODOS_FOR_MONTH,
  REMOVE_SAGA_TODOS,
  REMOVE_TODO,
  SAGA_CHANGE_COMPLETED,
  SAGA_GET_TODO,
  SAGA_GET_TODOS_FOR_MONTHS,
  SAGA_SET_TODO,
  SET_TODO,
  UPDATE_TO_DO_DESCRIPTION,
} from "constants/typesOfActions";

export interface ITask {
  task: string;
  id: string;
  completed: boolean;
  description: string;
}

export interface ISagaGetTodo {
  userId: string;
  pageId: string;
}

interface IShouldUpdate {
  findId: string | null;
  update: boolean;
}

export interface ISagaSetTodo {
  userId: string;
  date: string;
  taskForServer: ITask;
  pageId: string;
  shouldUpdate: IShouldUpdate;
}

export interface ISagaRemove {
  userId: string;
  numberDay: string;
  id: string;
}

export interface IPayloadChangeCompleted {
  id: string;
  pageId: string;
  taskId: string;
  task: ITask;
}

interface IRemoveTodo {
  id: string;
}

export const updateToDoDescription = (payload: ITask) => ({
  type: UPDATE_TO_DO_DESCRIPTION,
  payload,
});

export const setTodo = (payload: ITask) => ({
  type: SET_TODO,
  payload,
});

export const getTodo = (payload: ITask[]) => ({
  type: GET_TODO,
  payload,
});

export const sagaGetToDo = (payload: ISagaGetTodo) => ({
  type: SAGA_GET_TODO,
  payload,
});

export const sagaSetToDo = (payload: ISagaSetTodo) => ({
  type: SAGA_SET_TODO,
  payload,
});

export const sagaChangeCompleted = (payload: IPayloadChangeCompleted) => ({
  type: SAGA_CHANGE_COMPLETED,
  payload,
});

export const getToDosListSagaForMonths = (payload: string) => ({
  type: SAGA_GET_TODOS_FOR_MONTHS,
  payload,
});

export const getToDosForMonths = (payload: Record<string, string>[]) => ({
  type: GET_TODOS_FOR_MONTH,
  payload,
});

export const removeToDo = (payload: IRemoveTodo) => ({
  type: REMOVE_TODO,
  payload,
});

export const removeSagaToDos = (payload: ISagaRemove) => ({
  type: REMOVE_SAGA_TODOS,
  payload,
});
