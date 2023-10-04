import { ISagaRemove, removeToDo } from "store/reducers/toDosListReducer";
import { dataBase } from "../../../firebase";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import { put } from "redux-saga/effects";

interface IActionRemoveSaga {
  type: string;
  payload: ISagaRemove;
}

export function* removeToDoSaga(action: IActionRemoveSaga): unknown {
  const { userId, numberDay, id } = action.payload;
  const todoCollectionRef = doc(dataBase, userId, numberDay);
  try {
    yield updateDoc(todoCollectionRef, {
      [id]: deleteField(),
    });
    yield put(removeToDo({ id }));
  } catch (err) {
    console.error(err);
  }
}
