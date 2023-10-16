import { ITask } from "store/reducers/toDoListReducer/actions";
import {
  FirebaseClient,
  IFirebaseClient,
} from "./servicesClient/firebaseClient";
import toast from "react-hot-toast";

class ToDosService {
  httpClient: IFirebaseClient;
  constructor(httpClient: IFirebaseClient) {
    this.httpClient = httpClient;
  }
  async getDocuments(userId: string) {
    try {
      const response = await this.httpClient.getDocuments(userId);
      return response;
    } catch (err) {
      toast.error("Sorry we have problem with server!");
    }
  }
  async getDocument(userId: string, day: string) {
    try {
      const response = await this.httpClient.getDocument(userId, day);
      return response;
    } catch (err) {
      toast.error("Sorry we have problem with server!");
    }
  }
  async removeDocument(userId: string, numberDay: string, id: string) {
    try {
      await this.httpClient.removeTask(userId, numberDay, id);
    } catch (err) {
      toast.error("Sorry we have problem with server!");
    }
  }
  async changeStatus(id: string, pageId: string, taskId: string, task: ITask) {
    try {
      await this.httpClient.changeStatus(id, pageId, taskId, task);
    } catch (err) {
      toast.error("Sorry we have problem with server!");
    }
  }
  async saveDocument(
    date: string,
    userId: string,
    id: string,
    taskForServer: ITask,
  ) {
    try {
      await this.httpClient.saveTask(date, userId, id, taskForServer);
    } catch (err) {
      toast.error("Sorry we have problem with server!");
    }
  }
}

export const toDosService = new ToDosService(FirebaseClient);
