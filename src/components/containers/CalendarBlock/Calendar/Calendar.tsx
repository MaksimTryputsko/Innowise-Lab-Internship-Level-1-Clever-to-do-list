import React, { useEffect, useMemo, useState } from "react";
import { DayFromCalendar } from "components/containers/CalendarBlock/DayFromCalendar/DayFromCalendar";
import { arrayDaysFromToDay } from "functions/getDays";
import styles from "./calendar.module.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "hooks/useAuth";
import { getToDosListSagaForMonths } from "store/reducers/toDoListReducer/actions";
import { useToDosList } from "hooks/useToDosList";
import { convertArrayWithCompletedTask } from "functions/convertArrayWithCompletedTask";

interface IToDo {
  day: string;
  month: number;
  number: number;
  year: number;
  completedTasks?: number;
  outstandingTasks?: number;
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

  const daysWithToDos = convertArrayWithCompletedTask(
    toDosForMonth,
    arraysDaysWithShortDays,
  );

  return (
    <div className={styles.blockCalendar}>
      {daysWithToDos.map((day: IToDo) => {
        return (
          <Link key={Math.random()} to={`/${day.number}`}>
            <DayFromCalendar
              dayNumber={day.number}
              dayName={day.day}
              completedTasks={day.completedTasks}
              outstandingTasks={day.outstandingTasks}
            />
          </Link>
        );
      })}
    </div>
  );
};

export { Calendar };
