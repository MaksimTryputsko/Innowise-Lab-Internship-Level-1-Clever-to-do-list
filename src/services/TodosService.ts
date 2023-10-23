import { ITask } from "store/reducers/toDoListReducer/actions";
import toast from "react-hot-toast";

import FirebaseDataBaseService, {
  IDataBaseService,
} from "./FirebaseDataBaseService";

interface ITodosService {
  getTasksForMonths(userId: string): Promise<{ id: string }[] | undefined>;
  getTasksForDay(userId: string, day: string): Promise<ITask[] | undefined>;
  removeTask(userId: string, numberDay: string, id: string): void;
  changeTaskStatus(
    id: string,
    pageId: string,
    taskId: string,
    task: ITask,
  ): void;
  saveTask(
    date: string,
    userId: string,
    id: string,
    taskForServer: ITask,
  ): void;
}

class TodosService implements ITodosService {
  dataBaseService: IDataBaseService;
  constructor(dataBaseService: IDataBaseService) {
    this.dataBaseService = dataBaseService;
  }
  async getTasksForMonths(userId: string) {
    try {
      return await this.dataBaseService.getDocuments(userId);
    } catch (err) {
      toast.error("Sorry we have problem with server!");
    }
  }
  async getTasksForDay(userId: string, day: string) {
    try {
      const result = await this.dataBaseService.getDocument<ITask[]>(
        userId,
        day,
      );
      if (!result) {
        return [];
      }
      return Object.values(result);
    } catch (err) {
      toast.error("Sorry we have problem with server!");
    }
  }
  async removeTask(userId: string, numberDay: string, id: string) {
    try {
      await this.dataBaseService.removeDocument(userId, numberDay, id);
    } catch (err) {
      toast.error("Sorry we have problem with server!");
    }
  }
  async changeTaskStatus(
    id: string,
    pageId: string,
    taskId: string,
    task: ITask,
  ) {
    try {
      const document = {
        [taskId]: task,
      };
      await this.dataBaseService.updateDocument<ITask>(id, pageId, document);
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
      const document = {
        [`${id}`]: taskForServer,
      };
      await this.dataBaseService.saveDocument<ITask>(date, userId, document);
    } catch (err) {
      toast.error("Sorry we have problem with server!");
    }
  }
}

export const todosService = new TodosService(new FirebaseDataBaseService());
