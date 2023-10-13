import {
  IPayloadChangeCompleted,
  getToDosListSagaForMonths,
} from "store/reducers/toDoListReducer/actions";
import { toDosService } from "services/toDosSevice";
import { put } from "redux-saga/effects";

interface IActionChangeStatus {
  type: string;
  payload: IPayloadChangeCompleted;
}

export function* changeStatus(action: IActionChangeStatus): unknown {
  const { id, pageId, taskId, task } = action.payload;
  yield toDosService.changeStatus(id, pageId, taskId, task);
  yield put(getToDosListSagaForMonths(id));
}
