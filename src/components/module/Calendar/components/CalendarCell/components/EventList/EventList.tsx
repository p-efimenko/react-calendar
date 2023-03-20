import React from "react";
import { Stack } from "@mui/material";
import { EventItem } from "../EventItem";
import type { CalendarEvent } from "@/types";

interface EventListProps {
  //
  events: CalendarEvent[];
}

export const EventList: React.FC<EventListProps> = (props) => {
  //
  const { events } = props;

  return (
    <Stack p={1} spacing={1}>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </Stack>
  );
};
