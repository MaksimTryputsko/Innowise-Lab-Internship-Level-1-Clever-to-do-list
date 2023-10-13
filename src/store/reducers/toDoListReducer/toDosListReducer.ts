import {
  GET_TODO,
  GET_TODOS_FOR_MONTH,
  REMOVE_TODO,
  SET_TODO,
  UPDATE_TO_DO_DESCRIPTION,
} from "constants/typesOfActions";
import { ITask } from "./actions";

export interface IInitialState {
  toDos: ITask[];
  toDosForMonth: Record<string, ITask & string>[];
}

interface IAction {
  payload: ITask & ITask[];
  type: string;
}

const initialState: IInitialState = {
  toDos: [],
  toDosForMonth: [],
};

export const toDosListReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_TODO:
      return { ...state, toDos: [...action.payload] };
    case SET_TODO:
      return { ...state, toDos: [...state.toDos, action.payload] };
    case GET_TODOS_FOR_MONTH:
      return { ...state, toDosForMonth: [...action.payload] };
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
