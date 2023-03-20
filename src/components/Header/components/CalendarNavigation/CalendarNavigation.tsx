import React, { useMemo } from "react";

import { Button, Tooltip, IconButton, Stack, Box } from "@mui/material";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";

import { useAppSelector, useAppDispatch } from "@/store";

import {
  incrementMonth,
  decrementMonth,
  setSelectedDate,
} from "@/store/slices/calendarSlice";

import { format, getUnixTime, fromUnixTime } from "date-fns";

interface Props {
  //
}

export const CalendarNavigation: React.FC = () => {
  //

  const dispatch = useAppDispatch();
  const today = useAppSelector((state) => state.calendar.today.unixDate);
  const month = useAppSelector((state) => state.calendar.selectedDate.month);
  const year = useAppSelector((state) => state.calendar.selectedDate.year);

  const handleNextMonth = () => {
    //
    dispatch(incrementMonth());
  };

  const handlePrevMonth = () => {
    //
    dispatch(decrementMonth());
  };

  const handleToday = () => {
    //
    const date = getUnixTime(new Date());
    dispatch(setSelectedDate(date));
  };

  const handleCreateEvent = () => {
    //
  };

  const tooltipDelay = 1000;
  const todayTitle = useMemo(
    () => format(fromUnixTime(today), "EEEE, MMMM 18"),
    [today]
  );

  return (
    <>
      <Stack direction="row" spacing={0} ml={10}>
        <Tooltip title={todayTitle} enterDelay={tooltipDelay}>
          <Button
            variant="outlined"
            onClick={() => handleToday()}
            sx={{ marginRight: 2, textTransform: "capitalize" }}
          >
            Today
          </Button>
        </Tooltip>

        <Tooltip title="Previous month" enterDelay={tooltipDelay}>
          <IconButton
            size="small"
            aria-label="Previous month"
            onClick={() => handlePrevMonth()}
          >
            <NavigateBefore />
          </IconButton>
        </Tooltip>

        <Box lineHeight="35px" fontWeight={700} px={1}>
          {format(new Date(year, month - 1), "MMMM yyyy")}
        </Box>

        <Tooltip title="Next month" enterDelay={tooltipDelay}>
          <IconButton
            size="small"
            aria-label="Next month"
            onClick={() => handleNextMonth()}
          >
            <NavigateNext />
          </IconButton>
        </Tooltip>
      </Stack>
    </>
  );
};
