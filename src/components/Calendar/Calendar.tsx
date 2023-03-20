import React from "react";

import { Box, Grid } from "@mui/material";
import { EventModal, CalendarCell } from "./components";

import { getCalendarMatrix } from "@/utils";
import type { CalendarCell as ICalendarCell } from "@/types";

import { useAppDispatch, useAppSelector } from "@/store";
import { setSelectedCell } from "@/store/slices/calendarSlice";
import { toggleEventModal } from "@/store/slices/modalsSlice";

import { getUnixTime } from "date-fns";

const daysOfTheWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const Calendar: React.FC = () => {
  //
  const dispatch = useAppDispatch();
  const month = useAppSelector((state) => state.calendar.selectedDate.month);
  const year = useAppSelector((state) => state.calendar.selectedDate.year);

  const { matrix } = getCalendarMatrix(year, month);

  const handleOpenEventModal = (day: ICalendarCell) => {
    //
    const unixDate = getUnixTime(day.date);
    dispatch(toggleEventModal());
    dispatch(setSelectedCell(unixDate));
  };

  const onEventModalClose = () => {
    //
    dispatch(toggleEventModal());
    dispatch(setSelectedCell(null));
  };

  return (
    <>
      <Grid
        height={30}
        container
        item
        spacing={0}
        borderTop={"1px solid #dadce0"}
        borderLeft={"1px solid #dadce0"}
        bgcolor="#f3f3f3"
        fontWeight={500}
        textAlign="center"
        alignItems="center"
      >
        {daysOfTheWeek.map((item, index: number) => (
          <Grid item xs key={index} borderRight={"1px solid #dadce0"}>
            <Box>{item}</Box>
          </Grid>
        ))}
      </Grid>

      <Box height={"calc(100vh - 64px - 30px)"}>
        <Grid
          container
          spacing={0}
          columns={7}
          height={"100%"}
          borderLeft={"1px solid #dadce0"}
          borderTop={"1px solid #dadce0"}
          textAlign="center"
        >
          {matrix.map((week: ICalendarCell[], index: number) => (
            <Grid
              container
              item
              spacing={0}
              key={index}
              borderBottom={"1px solid #dadce0"}
              flexDirection="row"
              flexWrap="nowrap"
            >
              {week.map((day: ICalendarCell, index: number) => (
                <Grid
                  item
                  xs
                  key={index}
                  borderRight={"1px solid #dadce0"}
                  onClick={() => handleOpenEventModal(day)}
                >
                  <CalendarCell value={day} />
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>

        <EventModal />
      </Box>
    </>
  );
};
