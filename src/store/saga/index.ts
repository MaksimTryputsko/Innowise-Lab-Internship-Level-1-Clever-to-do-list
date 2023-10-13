import {
  REMOVE_SAGA_TODOS,
  SAGA_CHANGE_COMPLETED,
  SAGA_GET_TODO,
  SAGA_GET_TODOS_FOR_MONTHS,
  SAGA_LOGIN_USER,
  SAGA_REGISTRATION_USER,
  SAGA_SET_TODO,
} from "constants/typesOfActions";
import { takeEvery, all } from "redux-saga/effects";
import { registrationSaga } from "./entranceSaga/registrationSaga";
import { loginSaga } from "./entranceSaga/loginSaga";
import { getToDosFromServer } from "./toDosSaga/getToDoFromServer";
import { saveTask } from "./toDosSaga/saveTask";
import { getToDosSagaFromServerMonths } from "./toDosSaga/getToDosFromServerForMonths";
import { removeTask } from "./toDosSaga/removeTask";
import { changeStatus } from "./toDosSaga/changeStatus";

function* userWatcher() {
  yield takeEvery(SAGA_REGISTRATION_USER, registrationSaga);
  yield takeEvery(SAGA_LOGIN_USER, loginSaga);
}

function* toDosWatcher() {
  yield takeEvery(SAGA_GET_TODO, getToDosFromServer);
  yield takeEvery(SAGA_SET_TODO, saveTask);
  yield takeEvery(SAGA_GET_TODOS_FOR_MONTHS, getToDosSagaFromServerMonths);
  yield takeEvery(REMOVE_SAGA_TODOS, removeTask);
  yield takeEvery(SAGA_CHANGE_COMPLETED, changeStatus);
}
export function* rootWatcher() {
  yield all([userWatcher(), toDosWatcher()]);
}
