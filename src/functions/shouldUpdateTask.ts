import { ITask } from "store/reducers/toDosListReducer";

export const shouldUpdateTask = (
  arr: Record<string, ITask & string>[],
  day: string,
  task: string,
) => {
  const findDay = arr.find(el => el.id === day);
  if (findDay) {
    const findToDo = Object.entries(findDay);
    const findToDoFilter = findToDo
      .map(el => el[1])
      .filter(el => el.task !== undefined);
    const elToDo = findToDoFilter.find(el => el.task === task);
    if (elToDo) {
      return { findId: elToDo.id, update: true };
    }
  }
  return { findId: "", update: false };
};
