import { put } from "redux-saga/effects";

import {
  ISagaSetTodo,
  setTodo,
  updateToDoDescription,
} from "store/reducers/toDoListReducer/actions";
import { toDosService } from "services/toDosSevice";

interface IActionSaveTask {
  type: string;
  payload: ISagaSetTodo;
}

export function* saveTask(action: IActionSaveTask): unknown {
  const { userId, taskForServer, shouldUpdate, pageId, date } = action.payload;
  const { findId, update } = shouldUpdate;

  const id = update ? findId : taskForServer.id;
  toDosService.saveDocument(date, userId, `${id}`, taskForServer);

  if (pageId === date) {
    return yield put(
      update ? updateToDoDescription(taskForServer) : setTodo(taskForServer),
    );
  }
}
