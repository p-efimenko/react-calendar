import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setSelectedDate } from "@/store/slices/calendarSlice";

import { Autocomplete, TextField, Box, Stack } from "@mui/material";
import { format, fromUnixTime } from "date-fns";

import type { AutocompleteChangeReason } from "@mui/material";
import type { CalendarEvent } from "@/types";

interface Props {
  //
}

export const Search: React.FC<Props> = (props) => {
  //
  const {} = props;

  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.events.events);

  const onChange = (
    value: CalendarEvent | null,
    reason: AutocompleteChangeReason
  ) => {
    //
    if (reason === "selectOption") {
      // @ts-ignore
      dispatch(setSelectedDate(value.date));
    }
  };

  return (
    <>
      <Autocomplete
        size="small"
        disablePortal
        options={state ?? []}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search" />}
        getOptionLabel={(option) => option.title}
        renderOption={(props, option) => (
          <Stack component="li" textAlign="left" {...props}>
            <Box>{option.title}</Box>
            <Box>{format(fromUnixTime(option.date), "d MMMM")}</Box>
          </Stack>
        )}
        onChange={(_, value, reason) => onChange(value, reason)}
      />
    </>
  );
};
