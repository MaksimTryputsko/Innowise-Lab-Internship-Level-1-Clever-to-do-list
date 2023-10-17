import { errorProcessingLogin } from "functions/errorProcessing/errorProcessingLogin";
import { errorProcessingRegistration } from "functions/errorProcessing/errorProcessingRegistration";

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

interface IAuthService {
  registrationUser(email: string, password: string): Promise<unknown>;
  loginUser(email: string, password: string): Promise<unknown>;
}

class AuthService implements IAuthService {
  async registrationUser(email: string, password: string) {
    try {
      const auth = getAuth();
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      errorProcessingRegistration((err as Error).message);
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const auth = getAuth();
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      errorProcessingLogin((err as Error).message);
    }
  }
}

export const authService = new AuthService();
