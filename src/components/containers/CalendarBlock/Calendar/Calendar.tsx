import React, { useEffect, useMemo } from "react";
import { DayFromCalendar } from "components/containers/CalendarBlock/DayFromCalendar/DayFromCalendar";
import { arrayDaysFromToDay } from "functions/getDays";
import styles from "./calendar.module.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "hooks/useAuth";
import { getToDosListSagaForMonths } from "store/reducers/toDoListReducer/actions";
import { useToDosList } from "hooks/useToDosList";
import { convertToDosListWithAllDays } from "functions/convertToDosListWithAllDays";

export interface IDays {
  year: number;
  month: number;
  number: number;
  day: string;
}

const Calendar = () => {
  const dispatch = useDispatch();
  const { toDosForMonth } = useToDosList();
  const { id } = useAuth();
  const { pageId } = useParams();

  const arraysDaysWithShortDays = useMemo(() => {
    const arrayDays = arrayDaysFromToDay();
    return arrayDays.map(el => {
      return { ...el, day: el.day.slice(0, 3) };
    });
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getToDosListSagaForMonths(id));
    }
  }, [pageId]);

  const toDosList = convertToDosListWithAllDays(
    toDosForMonth,
    arraysDaysWithShortDays,
  );
  console.log(toDosList);
  return (
    <div className={styles.blockCalendar}>
      {toDosList.map(day => {
        return (
          <Link key={Math.random()} to={`/${day[0].number}`}>
            <DayFromCalendar
              dayNumber={day[0].number}
              dayName={day[0].day}
              tasksStatus={day[1]}
            />
          </Link>
        );
      })}
    </div>
  );
};

export { Calendar };
