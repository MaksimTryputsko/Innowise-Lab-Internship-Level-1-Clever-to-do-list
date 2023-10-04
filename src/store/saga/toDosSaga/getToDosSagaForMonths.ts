import { collection, getDocs } from "firebase/firestore";
import { dataBase } from "../../../firebase";
import { call, put } from "redux-saga/effects";
import { convertDataToArray } from "functions/convertDataToArray";
import { getToDosForMonths } from "store/reducers/toDosListReducer";

interface IActionSagaForMonths {
  type: string;
  payload: string;
}

export function* getToDosSagaForMonths(action: IActionSagaForMonths): unknown {
  const toDosCollectionRef = collection(dataBase, `${action.payload}`);
  try {
    const getToDosList = yield call(async () => {
      const data = await getDocs(toDosCollectionRef);
      return convertDataToArray(data);
    });
    yield put(getToDosForMonths(getToDosList));
  } catch (err) {
    console.error(err);
  }
}
