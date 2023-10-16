import { dataBase } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ITask } from "store/reducers/toDoListReducer/actions";

export interface IFirebaseClient {
  registrationUser(email: string, password: string): Promise<unknown>;
  loginUser(email: string, password: string): Promise<unknown>;
  getDocuments(userId: string): Promise<unknown>;
  getDocument(userId: string, day: string): Promise<unknown>;
  removeTask(userId: string, numberDay: string, id: string): void;
  changeStatus(id: string, pageId: string, taskId: string, task: ITask): void;
  saveTask(
    date: string,
    userId: string,
    id: string,
    taskForServer: ITask,
  ): void;
}

export const FirebaseClient: IFirebaseClient = {
  async registrationUser(email: string, password: string) {
    const auth = getAuth();
    return await createUserWithEmailAndPassword(auth, email, password);
  },
  async loginUser(email: string, password: string) {
    const auth = getAuth();
    return await signInWithEmailAndPassword(auth, email, password);
  },
  async getDocuments(userId: string) {
    const collectionRef = collection(dataBase, userId);
    return await getDocs(collectionRef);
  },
  async getDocument(userId: string, day: string) {
    const collectionRef = doc(dataBase, userId, day);
    return await getDoc(collectionRef);
  },
  async removeTask(userId: string, numberDay: string, id: string) {
    const todoCollectionRef = doc(dataBase, userId, numberDay);
    await updateDoc(todoCollectionRef, {
      [id]: deleteField(),
    });
  },
  async changeStatus(id: string, pageId: string, taskId: string, task: ITask) {
    await setDoc(
      doc(dataBase, `${id}`, pageId),
      {
        [taskId]: task,
      },
      { merge: true },
    );
  },
  async saveTask(
    date: string,
    userId: string,
    id: string,
    taskForServer: ITask,
  ) {
    await setDoc(
      doc(dataBase, `${userId}`, date),
      {
        [`${id}`]: taskForServer,
      },
      { merge: true },
    );
  },
};
