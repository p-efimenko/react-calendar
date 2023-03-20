import React from "react";

import { useFormContext, useController } from "react-hook-form";

import { Tooltip, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { Circle } from "@mui/icons-material";

import colors from "./constants/COLORS";

export const SelectColor: React.FC = () => {
  //
  const { control } = useFormContext();

  const { field } = useController({
    name: "color",
    control: control,
  });

  const internalOnChange = (_: any, value: string) => {
    //
    if (value !== null) {
      field.onChange(value);
    }
  };

  return (
    <>
      <ToggleButtonGroup
        exclusive
        value={field.value}
        onChange={internalOnChange}
        aria-label="Pick color"
      >
        {colors.map((item, index) => (
          <ToggleButton key={index} value={item.color} aria-label={item.title}>
            <Tooltip title={item.title}>
              <Circle sx={{ color: item.color }} />
            </Tooltip>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
};
