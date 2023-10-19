import {
  DocumentData,
  PartialWithFieldValue,
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { dataBase } from "../firebase";

export interface IDataBaseService {
  getDocuments(collectionId: string): Promise<{ id: string }[] | undefined>;
  getDocument<RESULT>(
    collectionId: string,
    documentId: string,
  ): Promise<RESULT | undefined>;
  removeDocument(
    collectionId: string,
    documentId: string,
    idFieldFromDocument: string,
  ): void;
  updateDocument<DOCUMENT_UPDATE>(
    collectionId: string,
    documentId: string,
    document: { [x: string]: DOCUMENT_UPDATE },
  ): void;
  saveDocument<DOCUMENT_SAVE>(
    documentId: string,
    collectionId: string,
    document: { [x: string]: DOCUMENT_SAVE },
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
  async getDocument<RESULT>(collectionId: string, documentId: string) {
    const collectionRef = doc(dataBase, collectionId, documentId);
    const data = await getDoc(collectionRef);
    const result = data.data();
    return result as RESULT;
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
  async updateDocument<DOCUMENT_UPDATE>(
    collectionId: string,
    documentId: string,
    document: { [x: string]: DOCUMENT_UPDATE },
  ) {
    await setDoc(doc(dataBase, `${collectionId}`, documentId), document, {
      merge: true,
    });
  }
  async saveDocument<DOCUMENT_SAVE>(
    documentId: string,
    collectionId: string,
    document: { [x: string]: DOCUMENT_SAVE },
  ) {
    await setDoc(doc(dataBase, `${collectionId}`, documentId), document, {
      merge: true,
    });
  }
}
