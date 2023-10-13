import { errorProcessingLogin } from "functions/errorProcessing/errorProcessingLogin";
import {
  FirebaseClient,
  IFirebaseClient,
} from "./servicesClient/firebaseClient";
import { errorProcessingRegistration } from "functions/errorProcessing/errorProcessingRegistration";

class AuthService {
  httpClient: IFirebaseClient;
  constructor(httpClient: IFirebaseClient) {
    this.httpClient = httpClient;
  }
  async registrationUserWithEmailAndPassword(email: string, password: string) {
    try {
      const response = await this.httpClient.registrationUser(email, password);
      return response;
    } catch (err) {
      errorProcessingRegistration((err as Error).message);
    }
  }

  async loginWithEmailAndPassword(email: string, password: string) {
    try {
      const response = await this.httpClient.loginUser(email, password);
      return response;
    } catch (err) {
      errorProcessingLogin((err as Error).message);
    }
  }
}

export const authService = new AuthService(FirebaseClient);
