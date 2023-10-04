import { IPayloadChangeCompleted } from "store/reducers/toDosListReducer";
import { dataBase } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";

interface IActionChangeCompletedSaga {
  type: string;
  payload: IPayloadChangeCompleted;
}

export function* changeCompletedSaga(
  action: IActionChangeCompletedSaga,
): unknown {
  const { id, pageId, taskId, task } = action.payload;
  try {
    yield setDoc(
      doc(dataBase, `${id}`, pageId),
      {
        [taskId]: task,
      },
      { merge: true },
    );
  } catch (err) {
    console.error(err);
  }
}
