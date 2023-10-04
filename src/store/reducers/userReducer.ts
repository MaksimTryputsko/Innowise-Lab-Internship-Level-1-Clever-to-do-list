import {
  REMOVE_USER,
  SAGA_LOGIN_USER,
  SAGA_REGISTRATION_USER,
  SET_USER,
} from "constants/typesOfActions";

export interface IInitialState {
  email: string | null;
  id: string | null;
}

interface IAction {
  payload: IInitialState;
  type: string;
}

export interface ISagaEntry {
  email: string;
  password: string;
}

const initialState: IInitialState = {
  email: null,
  id: null,
};

export const userReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        email: action.payload.email,
        id: action.payload.id,
      };
    case REMOVE_USER:
      return {
        ...state,
        email: null,
        id: null,
      };
    default:
      return state;
  }
};

export const setUser = (payload: IInitialState) => ({
  type: SET_USER,
  payload,
});

export const sagaRegistrationUser = (payload: ISagaEntry) => ({
  type: SAGA_REGISTRATION_USER,
  payload,
});

export const sagaLoginUser = (payload: ISagaEntry) => ({
  type: SAGA_LOGIN_USER,
  payload,
});

export const removeUser = () => ({ type: REMOVE_USER });
