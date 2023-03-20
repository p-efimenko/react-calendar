import React, { useState } from "react";

import { Paper, Box } from "@mui/material";
import { EventPopper } from "./components";

import type { CalendarEvent } from "@/types";

interface EventItemProps {
  //
  event: CalendarEvent;
}

const styles = {
  color: "white",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
};

export const EventItem: React.FC<EventItemProps> = (props) => {
  //
  const { event } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    //
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e?: any) => {
    //
    e?.stopPropagation();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "event-popover" : undefined;

  return (
    <Box>
      <Paper
        onClick={(e) => handleClick(e)}
        elevation={0}
        aria-describedby={id}
        sx={{ ...styles, background: event.color }}
      >
        {event.title}
      </Paper>

      <EventPopper
        event={event}
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
      />
    </Box>
  );
};
