import {
  DocumentData,
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { dataBase } from "../firebase";
import { ITask } from "store/reducers/toDoListReducer/actions";

export interface IDataBaseService {
  getDocuments(collectionId: string): Promise<DocumentData | undefined>;
  getDocument(
    collectionId: string,
    documentId: string,
  ): Promise<DocumentData | undefined>;
  removeDocument(
    collectionId: string,
    documentId: string,
    idFieldFromDocument: string,
  ): void;
  updateDocument(
    collectionId: string,
    documentId: string,
    document: Record<string, ITask>,
  ): void;
  saveDocument(
    documentId: string,
    collectionId: string,
    document: Record<string, ITask>,
  ): void;
}

export default class FirebaseDataBaseService implements IDataBaseService {
  async getDocuments(collectionId: string) {
    const collectionRef = collection(dataBase, collectionId);
    const data = await getDocs(collectionRef);
    return data.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));
  }
  async getDocument(collectionId: string, documentId: string) {
    const collectionRef = doc(dataBase, collectionId, documentId);
    const data = await getDoc(collectionRef);
    return data.data();
  }
  async removeDocument(
    collectionId: string,
    documentId: string,
    idFieldFromDocument: string,
  ) {
    const todoCollectionRef = doc(dataBase, collectionId, documentId);
    await updateDoc(todoCollectionRef, {
      [idFieldFromDocument]: deleteField(),
    });
  }
  async updateDocument(
    collectionId: string,
    documentId: string,
    document: Record<string, ITask>,
  ) {
    await setDoc(doc(dataBase, `${collectionId}`, documentId), document, {
      merge: true,
    });
  }
  async saveDocument(
    documentId: string,
    collectionId: string,
    document: Record<string, ITask>,
  ) {
    await setDoc(doc(dataBase, `${collectionId}`, documentId), document, {
      merge: true,
    });
  }
}
