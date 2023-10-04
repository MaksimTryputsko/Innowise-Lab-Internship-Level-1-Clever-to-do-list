import { put, call } from "redux-saga/effects";
import { ISagaGetTodo, getTodo } from "store/reducers/toDosListReducer";
import { collection, getDocs } from "firebase/firestore";
import { dataBase } from "../../../firebase";
import {
  convertDataToArray,
  convertDataToArrayForDay,
} from "functions/convertDataToArray";

interface IActionGetToDosSaga {
  type: string;
  payload: ISagaGetTodo;
}

export function* getToDosSaga(action: IActionGetToDosSaga): unknown {
  const { userId, pageId } = action.payload;
  const toDosCollectionRef = collection(dataBase, `${userId}`);
  try {
    const getToDosList = yield call(async () => {
      const data = await getDocs(toDosCollectionRef);
      return convertDataToArray(data);
    });
    const toDoListForDay = convertDataToArrayForDay(getToDosList, pageId);
    yield put(getTodo(toDoListForDay));
  } catch (err) {
    console.error(err);
  }
}
