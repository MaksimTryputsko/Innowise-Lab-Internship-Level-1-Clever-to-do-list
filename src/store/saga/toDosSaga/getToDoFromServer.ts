import { put, call } from "redux-saga/effects";
import { ISagaGetTodo, getTodo } from "store/reducers/toDoListReducer/actions";

import {
  convertDataToArray,
  convertDataToArrayForDay,
} from "functions/convertDataToArray";
import { toDosService } from "services/toDosSevice";

interface IActionGetToDosSaga {
  type: string;
  payload: ISagaGetTodo;
}

export function* getToDosFromServer(action: IActionGetToDosSaga): unknown {
  const { userId, pageId } = action.payload;
  const getToDosList = yield call(async () => {
    return toDosService.getDocuments(userId);
  });
  if (!getToDosList) {
    return;
  }
  const data = convertDataToArray(getToDosList);
  const toDoListForDay = convertDataToArrayForDay(data, pageId);
  yield put(getTodo(toDoListForDay));
}
