import { errorProcessingLogin } from "functions/errorProcessing/errorProcessingLogin";
import { errorProcessingRegistration } from "functions/errorProcessing/errorProcessingRegistration";

import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

interface IUser {
  email: string | null;
  id: string;
}

interface IAuthService {
  registrationUser(email: string, password: string): Promise<IUser | undefined>;
  loginUser(email: string, password: string): Promise<IUser | undefined>;
}

class FirebaseAuthService implements IAuthService {
  async registrationUser(email: string, password: string) {
    try {
      const auth = getAuth();
      const user = await createUserWithEmailAndPassword(auth, email, password);
      return {
        email: user.user.email,
        id: user.user.uid,
      };
    } catch (err) {
      errorProcessingRegistration((err as Error).message);
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const auth = getAuth();
      const user = await signInWithEmailAndPassword(auth, email, password);
      return {
        email: user.user.email,
        id: user.user.uid,
      };
    } catch (err) {
      errorProcessingLogin((err as Error).message);
    }
  }
}

export const authService = new FirebaseAuthService();
