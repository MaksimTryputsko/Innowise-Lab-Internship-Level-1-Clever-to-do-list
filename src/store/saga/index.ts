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
import { getToDosSaga } from "./toDosSaga/getToDoSaga";
import { setToDoSaga } from "./toDosSaga/setTodoSaga";
import { getToDosSagaForMonths } from "./toDosSaga/getToDosSagaForMonths";
import { removeToDoSaga } from "./toDosSaga/removeToDoSaga";
import { changeCompletedSaga } from "./toDosSaga/changeCompletedSaga";

function* userWatcher() {
  yield takeEvery(SAGA_REGISTRATION_USER, registrationSaga);
  yield takeEvery(SAGA_LOGIN_USER, loginSaga);
}

function* toDosWatcher() {
  yield takeEvery(SAGA_GET_TODO, getToDosSaga);
  yield takeEvery(SAGA_SET_TODO, setToDoSaga);
  yield takeEvery(SAGA_GET_TODOS_FOR_MONTHS, getToDosSagaForMonths);
  yield takeEvery(REMOVE_SAGA_TODOS, removeToDoSaga);
  yield takeEvery(SAGA_CHANGE_COMPLETED, changeCompletedSaga);
}
export function* rootWatcher() {
  yield all([userWatcher(), toDosWatcher()]);
}
