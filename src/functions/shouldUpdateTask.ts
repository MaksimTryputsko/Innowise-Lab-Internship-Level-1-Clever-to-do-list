import { ITask } from "store/reducers/toDoListReducer/actions";

export const shouldUpdateTask = (
  arr: Record<string, ITask & string>[],
  day: string,
  task: string,
) => {
  const findDay = arr.find(el => el.id === day);
  if (findDay) {
    const findToDo = Object.values(findDay)
      .filter(element => Boolean(element.task))
      .find(element => element.task === task);
    if (findToDo) {
      return { findId: findToDo.id, update: true };
    }
  }
  return { findId: null, update: false };
};
