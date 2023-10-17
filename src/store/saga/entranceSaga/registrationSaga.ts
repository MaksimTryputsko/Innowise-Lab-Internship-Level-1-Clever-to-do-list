import { put, call } from "redux-saga/effects";
import { setUser } from "store/reducers/userReducer/actions";
import { IActionEntrySaga } from "./loginSaga";
import { authService } from "services/authService";

export function* registrationSaga(action: IActionEntrySaga): unknown {
  const { email, password } = action.payload;
  const userFromServer = yield call(async () => {
    return authService.registrationUser(email, password);
  });
  if (!userFromServer) {
    return;
  }

  yield put(setUser(userFromServer));
}
