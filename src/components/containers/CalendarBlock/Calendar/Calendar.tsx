import React, { useEffect, useMemo } from "react";
import { DayFromCalendar } from "components/containers/CalendarBlock/DayFromCalendar/DayFromCalendar";
import { arrayDaysFromToday } from "functions/getDays";
import styles from "./calendar.module.scss";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { useTodos } from "store/todosStore";

export interface IDays {
  year: number;
  month: number;
  number: number;
  day: string;
}

const Calendar = () => {
  const { getTodosForMonth, todos } = useTodos();

  const { id } = useAuth();
  const { pageId } = useParams();

  const arraysDaysWithShortDays: IDays[] = useMemo(() => {
    const arrayDays = arrayDaysFromToday();
    return arrayDays.map(el => {
      return { ...el, day: el.day.slice(0, 3) };
    });
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    }
    getTodosForMonth(id);
  }, [pageId]);

  return (
    <div className={styles.blockCalendar}>
      {arraysDaysWithShortDays.map(day => {
        return (
          <Link key={day.number} to={`/${day.number}`}>
            <DayFromCalendar
              dayNumber={day.number}
              dayName={day.day}
              todos={todos}
            />
          </Link>
        );
      })}
    </div>
  );
};

export { Calendar };
