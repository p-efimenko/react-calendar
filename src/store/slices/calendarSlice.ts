import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CalendarEvent, DateObject, DateUnix } from "@/types";

import {
  getMonth,
  getYear,
  getDate,
  getUnixTime,
  fromUnixTime,
} from "date-fns";

interface CalendarState {
  today: DateObject;
  selectedDate: DateObject;
  selectedCell: DateObject | null;
  selectedEvent: CalendarEvent | null;
}

const date = new Date();

const today = {
  unixDate: getUnixTime(date),
  year: getYear(date),
  month: getMonth(date) + 1,
  day: getDate(date),
};

const initialState: CalendarState = {
  today: today,
  selectedDate: today,
  selectedCell: null,
  selectedEvent: null,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    incrementMonth: (state) => {
      if (state.selectedDate.month === 12) {
        state.selectedDate.month = 1;
        state.selectedDate.year += 1;
        return;
      }

      state.selectedDate.month += 1;
    },
    decrementMonth: (state) => {
      if (state.selectedDate.month === 1) {
        state.selectedDate.month = 12;
        state.selectedDate.year -= 1;
        return;
      }
      state.selectedDate.month -= 1;
    },
    setSelectedDate: (state, action: PayloadAction<DateUnix>) => {
      const date = fromUnixTime(action.payload);
      state.selectedDate.unixDate = action.payload;
      state.selectedDate.month = getMonth(date) + 1;
      state.selectedDate.year = getYear(date);
      state.selectedDate.day = getDate(date);
    },
    setSelectedCell: (state, action: PayloadAction<DateUnix | null>) => {
      if (action.payload === null) {
        state.selectedCell = null;
      } else {
        const date = fromUnixTime(action.payload);
        const selectedDate = {
          unixDate: action.payload,
          month: getMonth(date) + 1,
          year: getYear(date),
          day: getDate(date),
        };
        state.selectedCell = selectedDate;
      }
    },
    setSelectedEvent: (state, action: PayloadAction<CalendarEvent | null>) => {
      state.selectedEvent = action.payload;
    },
  },
});

export const {
  incrementMonth,
  decrementMonth,
  setSelectedDate,
  setSelectedCell,
  setSelectedEvent,
} = calendarSlice.actions;

export default calendarSlice.reducer;
