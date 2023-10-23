import { call, put } from "redux-saga/effects";
import { getToDosForMonths } from "store/reducers/toDoListReducer/actions";
import { todosService } from "services/TodosService";

interface IActionSagaForMonths {
  type: string;
  payload: string;
}

export function* getToDosSagaFromServerMonths(
  action: IActionSagaForMonths,
): unknown {
  const getToDosList = yield call(async () => {
    return todosService.getTasksForMonths(action.payload);
  });
  if (!getToDosList) {
    return;
  }
  yield put(getToDosForMonths(getToDosList));
}
