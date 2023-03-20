import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { CalendarEvent } from "@/types";

import { v4 as uuidv4 } from "uuid";

interface EventsState {
  events: CalendarEvent[];
}

const initialState: EventsState = {
  events: [],
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    createEvent: (state, action: PayloadAction<Omit<CalendarEvent, "id">>) => {
      const id = uuidv4();
      const event = {
        id: id,
        ...action.payload,
      };
      state.events = [...state.events, event];
    },
    updateEvent: (state, action: PayloadAction<CalendarEvent>) => {
      const events = [...state.events];
      const index = events.findIndex((item) => item.id === action.payload.id);
      events.splice(index, 1);
      events.push(action.payload);
      state.events = events;
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      const events = [...state.events].filter(
        (event) => event.id !== action.payload
      );
      state.events = events;
    },
  },
});
export const { createEvent, updateEvent, deleteEvent } = eventsSlice.actions;

const events = (state: RootState) => state.events.events;

// export const selector = createSelector([events], (events) => {});

export default eventsSlice.reducer;
