import { put } from "redux-saga/effects";

import {
  ISagaSetTodo,
  getToDosListSagaForMonths,
  setTodo,
  updateToDoDescription,
} from "store/reducers/toDoListReducer/actions";
import { todosService } from "services/TodosService";

interface IActionSaveTask {
  type: string;
  payload: ISagaSetTodo;
}

export function* saveTask(action: IActionSaveTask): unknown {
  const { userId, taskForServer, shouldUpdate, pageId, date } = action.payload;
  const { findId, update } = shouldUpdate;

  const id = update ? findId : taskForServer.id;
  yield todosService.saveTask(date, userId, `${id}`, taskForServer);
  yield put(getToDosListSagaForMonths(userId));

  if (pageId === date) {
    return yield put(
      update ? updateToDoDescription(taskForServer) : setTodo(taskForServer),
    );
  }
}
