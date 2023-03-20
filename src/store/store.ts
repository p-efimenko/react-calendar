import { configureStore, combineReducers } from "@reduxjs/toolkit";
// Slices
import eventsReducer from "./slices/eventsSlice";
import calendarReducer from "./slices/calendarSlice";
import modalsReducer from "./slices/modalsSlice";

import { loadState } from "@/utils";

const reducers = combineReducers({
  calendar: calendarReducer,
  events: eventsReducer,
  modals: modalsReducer,
});

const persistedEventsState = loadState("events");

export const store = configureStore({
  reducer: reducers,
  preloadedState: {
    events: {
      events: persistedEventsState ? [...persistedEventsState] : [],
    },
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
