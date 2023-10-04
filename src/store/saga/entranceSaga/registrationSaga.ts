import { put, call } from "redux-saga/effects";
import { setUser } from "store/reducers/userReducer";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { IActionEntrySaga } from "./loginSaga";

export function* registrationSaga(action: IActionEntrySaga): unknown {
  const { email, password } = action.payload;
  const auth = getAuth();
  try {
    const registrationUser = yield call(async () => {
      const userFromServer = await createUserWithEmailAndPassword(
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
    yield put(setUser(registrationUser));
  } catch (err) {
    if ((err as Error).message === "Firebase: Error (auth/invalid-email).") {
      return alert("Your email is invalid, pease write correct e-mail !");
    }
    if (
      (err as Error).message === "Firebase: Error (auth/email-already-in-use)."
    ) {
      return alert("This email already use, try with other e-mail !");
    }
    return alert(
      "Change password please, your password mast have minimum 9 symbols !",
    );
  }
}
