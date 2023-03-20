import React, { useState, useRef } from "react";
import { useFormContext, useController } from "react-hook-form";

import { Box, TextField, Button } from "@mui/material";

import { GuestsList } from "../GuestsList";

export const GuestsForm: React.FC = () => {
  //
  const { control } = useFormContext();

  const { field, fieldState } = useController({
    name: "guests",
    control: control,
  });

  const [value, setValue] = useState<string>("");

  const ref = useRef<HTMLInputElement>(null);

  const isDisabled = value.length === 0;

  const onAdd = (): void => {
    //
    const values = [...field.value];
    values.push(value);
    field.onChange(values);
    setValue("");
    // focus field after adding
    ref?.current?.focus();
  };

  const onDelete = (index: number): void => {
    //
    const values = [...field.value];
    values.splice(index, 1);
    field.onChange(values);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //
    if (event.key === "Enter" && !isDisabled) {
      onAdd();
    }
  };

  return (
    <>
      <TextField
        inputRef={ref}
        value={value}
        id="guest"
        label="Guest"
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: (
            <Button disabled={isDisabled} onClick={() => onAdd()}>
              Add
            </Button>
          ),
        }}
        onChange={(e) => setValue(e.target.value)}
        error={fieldState.invalid}
        helperText={fieldState.error?.message}
        onKeyDown={onKeyDown}
      />

      <Box mt={1}>
        <GuestsList values={field.value} onDelete={onDelete} />
      </Box>
    </>
  );
};
