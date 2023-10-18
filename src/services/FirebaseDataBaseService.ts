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

export interface IDataBaseService<T, X> {
  getDocuments(collectionId: string): X;
  getDocument(collectionId: string, documentId: string): X;
  removeDocument(
    collectionId: string,
    documentId: string,
    idFieldFromDocument: string,
  ): void;
  updateDocument(collectionId: string, documentId: string, document: T): void;
  saveDocument(documentId: string, collectionId: string, document: T): void;
}

export default class FirebaseDataBaseService
  implements
    IDataBaseService<Record<string, ITask>, Promise<DocumentData | undefined>>
{
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
    const result = data.data();
    return result;
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
