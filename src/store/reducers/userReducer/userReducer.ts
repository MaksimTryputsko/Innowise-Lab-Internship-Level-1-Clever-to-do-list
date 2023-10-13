import { REMOVE_USER, SET_USER } from "constants/typesOfActions";

export interface IInitialState {
  email: string | null;
  id: string | null;
}

interface IAction {
  payload: IInitialState;
  type: string;
}

const initialState: IInitialState = {
  email: null,
  id: null,
};

export const userReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_USER:
      return {
        email: action.payload.email,
        id: action.payload.id,
      };
    case REMOVE_USER:
      return {
        email: null,
        id: null,
      };
    default:
      return state;
  }
};
