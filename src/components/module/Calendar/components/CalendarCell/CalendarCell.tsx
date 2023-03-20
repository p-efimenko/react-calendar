import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store";

import { Box } from "@mui/material";

import { EventList } from "./components";

import { isToday, getUnixTime } from "date-fns";

import type { CalendarCell as ICalendarCell, CalendarEvent } from "@/types";

interface CalendarCellProps {
  //
  value: ICalendarCell;
}

const isTodayStyles = {
  background: "#1a73e8",
  borderRadius: "100%",
  color: "white",
};

export const CalendarCell: React.FC<CalendarCellProps> = (props) => {
  //
  const { value } = props;

  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const state = useAppSelector((state) => state.events.events);

  // TODO: fix hydration error
  useEffect(() => {
    if (state) {
      const events = state.filter(
        (event: CalendarEvent) => event.date === getUnixTime(value.date)
      );
      setEvents(events);
    }
  }, [value, state]);

  return (
    <>
      <Box color={value.inMonth ? "black" : "#c9c9c9"} p={1}>
        <Box
          height={30}
          width={30}
          fontSize={14}
          fontWeight={500}
          lineHeight={"30px"}
          display="inline-block"
          sx={isToday(value.date) ? isTodayStyles : undefined}
        >
          {value.day}
        </Box>
        <EventList events={events} />
      </Box>
    </>
  );
};
