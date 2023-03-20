import React, { useMemo, useEffect } from "react";
import { useFormContext, useController } from "react-hook-form";
import { useAppSelector } from "@/store";

import { DatePicker } from "@mui/x-date-pickers";
import { fromUnixTime } from "date-fns";

export const SelectDate: React.FC = () => {
  //
  const { control } = useFormContext();

  const { field, fieldState } = useController({
    name: "date",
    control: control,
  });

  const selectedCell = useAppSelector((state) => state.calendar.selectedCell);
  const selectedEvent = useAppSelector((state) => state.calendar.selectedEvent);

  const initialDate = useMemo(
    () =>
      selectedEvent
        ? fromUnixTime(selectedEvent.date)
        : fromUnixTime(selectedCell?.unixDate),
    []
  );

  useEffect(() => {
    field.onChange(initialDate);
  }, [initialDate]);

  const onInternalChange = (date: Date | null) => {
    //
    field.onChange(date);
  };

  return (
    <>
      <DatePicker
        label="Date"
        value={field.value}
        onChange={onInternalChange}
        slotProps={{
          textField: {
            helperText: fieldState.error?.message,
            error: fieldState.invalid,
          },
        }}
      />
    </>
  );
};
