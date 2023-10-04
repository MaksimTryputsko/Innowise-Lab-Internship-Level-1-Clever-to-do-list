import { put } from "redux-saga/effects";
import { dataBase } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  ISagaSetTodo,
  setTodo,
  updateToDoDescription,
} from "store/reducers/toDosListReducer";

interface IActionSetTodoSaga {
  type: string;
  payload: ISagaSetTodo;
}

export function* setToDoSaga(action: IActionSetTodoSaga): unknown {
  const { date, userId, taskForServer, shouldUpdate, pageId } = action.payload;

  const { findId, update } = shouldUpdate;
  try {
    if (update) {
      yield setDoc(
        doc(dataBase, `${userId}`, date),
        {
          [findId]: taskForServer,
        },
        { merge: true },
      );
      if (pageId === date) {
        return yield put(updateToDoDescription(taskForServer));
      }
    } else {
      yield setDoc(
        doc(dataBase, `${userId}`, date),
        {
          [taskForServer.id]: taskForServer,
        },
        { merge: true },
      );
      if (pageId === date) {
        yield put(setTodo(taskForServer));
      }
    }
  } catch (err) {
    console.log(err);
  }
}
