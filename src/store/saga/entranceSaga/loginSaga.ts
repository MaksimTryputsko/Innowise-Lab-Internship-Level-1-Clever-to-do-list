import { put, call } from "redux-saga/effects";
import { ISagaEntry, setUser } from "store/reducers/userReducer";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export interface IActionEntrySaga {
  type: string;
  payload: ISagaEntry;
}

export function* loginSaga(action: IActionEntrySaga): unknown {
  const { email, password } = action.payload;
  const auth = getAuth();
  try {
    const loginUser = yield call(async () => {
      const userFromServer = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userData = {
        email: userFromServer.user.email,
        id: userFromServer.user.uid,
      };
      return userData;
    });
    yield put(setUser(loginUser));
  } catch (err) {
    if ((err as Error).message === "Firebase: Error (auth/invalid-email).") {
      return alert("Your email is invalid, pease write correct e-mail !");
    }
    if (
      (err as Error).message ===
      "Firebase: Error (auth/invalid-login-credentials)."
    ) {
      return alert("Please write correct data !");
    }
    return alert("Please, try later");
  }
}
