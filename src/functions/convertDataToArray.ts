interface INewArray {
  id: string;
  completed: boolean;
  task: string;
  description: string;
}
export const convertDataToArray = (data: any) => {
  return data.docs.map((doc: any) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const convertDataToArrayForDay = (data: any, pageId: string) => {
  const filterData = data.filter((el: any) => el.id === pageId);
  if (filterData.length > 0) {
    const newArr: INewArray[] = Object.entries(filterData[0])
      .map((el: any) => {
        return {
          id: el[0],
          task: el[1].task,
          completed: el[1].completed,
          description: el[1].description,
        };
      })
      .filter(el => el.task !== undefined);
    return newArr;
  }
  return [];
};
