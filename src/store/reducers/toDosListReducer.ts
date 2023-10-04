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

export interface IInitialState {
  toDos: ITask[];
  toDosForMonth: Record<string, ITask & string>[];
}

export interface ITask {
  task: string;
  id: string;
  completed: boolean;
  description: string;
}

interface IAction {
  payload: ITask;
  type: string;
}

export interface ISagaGetTodo {
  userId: string;
  pageId: string;
}

interface IShouldUpdate {
  findId: string;
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

const initialState: IInitialState = {
  toDos: [],
  toDosForMonth: [],
};

export const toDosListReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_TODO:
      return { ...state, toDos: action.payload };
    case SET_TODO:
      return { ...state, toDos: [...state.toDos, action.payload] };
    case GET_TODOS_FOR_MONTH:
      return { ...state, toDosForMonth: action.payload };
    case UPDATE_TO_DO_DESCRIPTION:
      return {
        ...state,
        toDos: [
          ...[...state.toDos].filter(el => el.task !== action.payload.task),
          action.payload,
        ],
      };
    case REMOVE_TODO:
      return {
        ...state,
        toDos: [...state.toDos].filter(todo => todo.id !== action.payload.id),
      };
    default:
      return state;
  }
};

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
