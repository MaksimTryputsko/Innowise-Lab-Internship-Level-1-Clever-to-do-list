export const convertDataToArray = (data: any) => {
  return data.docs.map((doc: any) => ({
    ...doc.data(),
    id: doc.id,
  }));
};
