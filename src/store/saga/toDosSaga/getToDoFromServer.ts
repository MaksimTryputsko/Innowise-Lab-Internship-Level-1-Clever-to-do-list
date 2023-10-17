import { put, call } from "redux-saga/effects";
import { ISagaGetTodo, getTodo } from "store/reducers/toDoListReducer/actions";
import { todosService } from "services/TodosService";

interface IActionGetToDosSaga {
  type: string;
  payload: ISagaGetTodo;
}

export function* getToDosFromServer(action: IActionGetToDosSaga): unknown {
  const { userId, day } = action.payload;

  const getToDosList = yield call(async () => {
    return await todosService.getTasksForDay(userId, day);
  });

  if (!getToDosList) {
    return yield put(getTodo([]));
  }

  yield put(getTodo(Object.values(getToDosList)));
}
