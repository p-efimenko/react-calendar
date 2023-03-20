import {
  add,
  sub,
  getDaysInMonth,
  getWeeksInMonth,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  getDate,
  differenceInDays,
} from "date-fns";

import type { CalendarCell } from "@/types";

export function getCalendarMatrix(
  year: number,
  month: number,
  weekStartsOn: 0 | 1 = 1 // 0 for Sunday, 1 for Monday
): {
  days: CalendarCell[];
  matrix: CalendarCell[][];
} {
  //
  const indexOfMonth = month - 1;
  const date = new Date(year, indexOfMonth);

  const daysInWeek = 7;
  const daysInMonth = getDaysInMonth(date);
  const weeksInMonth = getWeeksInMonth(date, { weekStartsOn });

  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);

  const firstDayOfWeekOfMonth = startOfWeek(firstDayOfMonth, { weekStartsOn });
  const lastDayWeekOfMonth = endOfWeek(lastDayOfMonth, { weekStartsOn });

  const offsetAtStartOfMonth = differenceInDays(
    firstDayOfMonth,
    firstDayOfWeekOfMonth
  );
  const offsetAtEndOfMonth = differenceInDays(
    lastDayWeekOfMonth,
    lastDayOfMonth
  );

  // Get the last and next months
  const lastMonth = sub(date, { months: 1 });
  const nextMonth = add(date, { months: 1 });

  // Create an array of all the days in the month
  const daysInMonthArray = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    return {
      date: new Date(year, indexOfMonth, day),
      day: day,
      inMonth: true,
    };
  });

  // Create an array of all the days in the previous month
  const lastMonthDaysArray = Array.from(
    { length: offsetAtStartOfMonth },
    (_, index) => {
      //
      const date = sub(endOfMonth(lastMonth), { days: index });
      const day = getDate(date);

      return {
        date: date,
        day: day,
        inMonth: false,
      };
    }
  );

  // Sort array ASC
  lastMonthDaysArray.sort((a, b) => a.day - b.day);

  // Create an array of all the days in the next month
  const nextMonthDaysArray = Array.from(
    { length: offsetAtEndOfMonth },
    (_, index) => {
      //
      const date = add(startOfMonth(nextMonth), { days: index });
      const day = getDate(date);

      return {
        date: date,
        day: day,
        inMonth: false,
      };
    }
  );

  // Combine the arrays into a single array of all the days
  const days: CalendarCell[] = [
    ...lastMonthDaysArray,
    ...daysInMonthArray,
    ...nextMonthDaysArray,
  ];

  // Create calendar matrix from all the days
  const matrix: CalendarCell[][] = [];

  for (let i = 0; i < weeksInMonth; i++) {
    const start = i * daysInWeek;
    const end = i * daysInWeek + daysInWeek;
    const week = days.slice(start, end);
    matrix.push(week);
  }

  return { days, matrix };
}
