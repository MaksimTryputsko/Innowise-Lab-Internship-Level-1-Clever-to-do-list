import { put, call } from "redux-saga/effects";
import { ISagaEntry, setUser } from "store/reducers/userReducer/actions";
import { authService } from "services/authService";

export interface IActionEntrySaga {
  type: string;
  payload: ISagaEntry;
}

export function* loginSaga(action: IActionEntrySaga): unknown {
  const { email, password } = action.payload;
  const userFromServer = yield call(async () => {
    return authService.loginUser(email, password);
  });
  if (!userFromServer) {
    return;
  }
  yield put(setUser(userFromServer));
}
