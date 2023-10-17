import { ITask } from "store/reducers/toDoListReducer/actions";
import toast from "react-hot-toast";
import { dataBase } from "../firebase";

import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

interface IFirebaseTodosService {
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

class FirebaseTodosService implements IFirebaseTodosService {
  async getDocuments(userId: string) {
    try {
      const collectionRef = collection(dataBase, userId);
      const data = await getDocs(collectionRef);
      return data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
    } catch (err) {
      toast.error("Sorry we have problem with server!");
    }
  }
  async getDocument(userId: string, day: string) {
    try {
      const collectionRef = doc(dataBase, userId, day);
      const data = await getDoc(collectionRef);
      return data.data();
    } catch (err) {
      toast.error("Sorry we have problem with server!");
    }
  }
  async removeTask(userId: string, numberDay: string, id: string) {
    try {
      const todoCollectionRef = doc(dataBase, userId, numberDay);
      await updateDoc(todoCollectionRef, {
        [id]: deleteField(),
      });
    } catch (err) {
      toast.error("Sorry we have problem with server!");
    }
  }
  async changeStatus(id: string, pageId: string, taskId: string, task: ITask) {
    try {
      await setDoc(
        doc(dataBase, `${id}`, pageId),
        {
          [taskId]: task,
        },
        { merge: true },
      );
    } catch (err) {
      toast.error("Sorry we have problem with server!");
    }
  }
  async saveTask(
    date: string,
    userId: string,
    id: string,
    taskForServer: ITask,
  ) {
    try {
      await setDoc(
        doc(dataBase, `${userId}`, date),
        {
          [`${id}`]: taskForServer,
        },
        { merge: true },
      );
    } catch (err) {
      toast.error("Sorry we have problem with server!");
    }
  }
}

export const toDosService = new FirebaseTodosService();
