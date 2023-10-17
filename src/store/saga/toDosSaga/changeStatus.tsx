import {
  IPayloadChangeCompleted,
  getToDosListSagaForMonths,
} from "store/reducers/toDoListReducer/actions";
import { todosService } from "services/TodosService";
import { put } from "redux-saga/effects";

interface IActionChangeStatus {
  type: string;
  payload: IPayloadChangeCompleted;
}

export function* changeStatus(action: IActionChangeStatus): unknown {
  const { id, pageId, taskId, task } = action.payload;
  yield todosService.changeTaskStatus(id, pageId, taskId, task);
  yield put(getToDosListSagaForMonths(id));
}
