import { ITask } from "store/reducers/toDosListReducer";

export interface IArrayDays {
  year: number;
  month: number;
  number: number;
  day: string;
}

interface IOldItem {
  number: number;
  completedTasks: number;
  outstandingTasks: number;
}

export const convertArrayWithCompletedTask = (
  defaultArray: Record<string, ITask & string>[],
  arraysDaysWithShortDays: IArrayDays[],
) => {
  const daysArrayWithToDos = defaultArray.map(el => {
    return { number: el.id, completedTasks: null, outstandingTasks: null };
  });

  const setAllElementsToArray = defaultArray.map(el =>
    Object.entries(el).map(el2 => {
      return el2[1];
    }),
  );

  const getCompletedElements = setAllElementsToArray.map(el =>
    el.map(el => {
      return el.completed;
    }),
  );
  const getCompletedElementsFilter = getCompletedElements.map(el =>
    el.filter(el => el !== undefined),
  );
  const outstandingTasks = getCompletedElementsFilter.map(
    el => el.filter(item => !item).length,
  );
  const completedTasks = getCompletedElementsFilter.map(
    el => el.filter(item => item).length,
  );

  const daysArrayWithToDosFalseOrTrueTasks = daysArrayWithToDos.map(
    (el, index) => {
      return {
        number: +el.number,
        completedTasks: completedTasks[index],
        outstandingTasks: outstandingTasks[index],
      };
    },
  );
  const arrayForReducer = [
    ...daysArrayWithToDosFalseOrTrueTasks,
    ...arraysDaysWithShortDays,
  ];

  const result = arrayForReducer.reduce((acc, item) => {
    const oldItem = acc.find(
      (oldItem: IOldItem) => oldItem.number === item.number,
    );
    if (oldItem) {
      Object.assign(oldItem, item);
    } else {
      acc.push(item as never);
    }
    return acc;
  }, []);
  return result.sort((a: IArrayDays, b: IArrayDays) =>
    a.number > b.number ? 1 : -1,
  );
};
