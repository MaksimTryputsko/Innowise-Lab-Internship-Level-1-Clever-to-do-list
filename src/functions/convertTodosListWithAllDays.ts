import { ITask } from "store/reducers/toDoListReducer/actions";

export interface IDay {
  year: number;
  month: number;
  number: number;
  day: string;
}

export const convertTodosListWithAllDays = (
  defArr: Record<string, ITask | string>[],
  arraysDays: IDay[],
) => {
  const newArr: (IDay | [IDay, Record<string, string | ITask>])[] =
    arraysDays.map(day => {
      const findElement = defArr.find(
        dayFromServer => dayFromServer.id === `${day.number}`,
      );
      return findElement ? [day, findElement] : day;
    });
  return newArr.map(
    (day: IDay | [IDay, Record<string, string | ITask>] | any) =>
      day.number
        ? [day]
        : [
            day[0],
            Object.values(day[1]).filter(
              (filterElement, index) =>
                index !== Object.values(day[1]).length - 1,
            ),
          ],
  );
};
