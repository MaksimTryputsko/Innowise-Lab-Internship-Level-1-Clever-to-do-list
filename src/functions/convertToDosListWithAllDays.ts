import { ITask } from "store/reducers/toDoListReducer/actions";

export interface IDays {
  year: number;
  month: number;
  number: number;
  day: string;
}

export const convertToDosListWithAllDays = (
  defArr: Record<string, ITask | string>[],
  arraysDays: IDays[],
) => {
  const newArr = arraysDays.map(el => {
    const findElement = defArr.find(el2 => el2.id === `${el.number}`);
    return findElement ? [el, findElement] : el;
  });
  return newArr.map((el: any) =>
    el.number
      ? [el]
      : [
          el[0],
          Object.values(el[1]).filter(
            (el2, i) => i !== Object.values(el[1]).length - 1,
          ),
        ],
  );
};
