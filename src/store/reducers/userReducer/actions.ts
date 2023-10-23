import {
  REMOVE_USER,
  SAGA_LOGIN_USER,
  SAGA_REGISTRATION_USER,
  SET_USER,
} from "constants/typesOfActions";
import { IInitialState } from "./userReducer";

export interface ISagaEntry {
  email: string;
  password: string;
}

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
