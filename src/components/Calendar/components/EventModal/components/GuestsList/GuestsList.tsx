import React from "react";

import { Grid, Chip } from "@mui/material";

interface Props {
  //
  values: string[];
  onDelete?: (index: number) => void;
}

export const GuestsList: React.FC<Props> = (props) => {
  //
  const { values, onDelete } = props;

  return (
    <>
      <Grid container spacing={1}>
        {values.map((item, index) => (
          <Grid item key={index}>
            <Chip
              label={item}
              onDelete={onDelete ? () => onDelete(index) : undefined}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
