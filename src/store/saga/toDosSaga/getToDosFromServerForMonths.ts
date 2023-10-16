import { call, put } from "redux-saga/effects";
import { getToDosForMonths } from "store/reducers/toDoListReducer/actions";
import { toDosService } from "services/toDosSevice";

interface IActionSagaForMonths {
  type: string;
  payload: string;
}

export function* getToDosSagaFromServerMonths(
  action: IActionSagaForMonths,
): unknown {
  const getToDosList = yield call(async () => {
    return toDosService.getDocuments(action.payload);
  });
  
  if (!getToDosList) {
    return;
  }

  yield put(getToDosForMonths(getToDosList));
}
