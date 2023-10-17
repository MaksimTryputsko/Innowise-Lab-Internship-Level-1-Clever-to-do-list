import {
  ISagaRemove,
  removeToDo,
} from "store/reducers/toDoListReducer/actions";
import { put } from "redux-saga/effects";
import { toDosService } from "services/FirebaseTodosService";

interface IActionRemoveSaga {
  type: string;
  payload: ISagaRemove;
}

export function* removeTask(action: IActionRemoveSaga): unknown {
  const { userId, numberDay, id } = action.payload;

  yield toDosService.removeTask(userId, numberDay, id);
  yield put(removeToDo({ id }));
}
