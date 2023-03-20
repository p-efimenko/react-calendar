import React from "react";

import { useAppDispatch } from "@/store";
import { deleteEvent } from "@/store/slices/eventsSlice";
import { setSelectedEvent } from "@/store/slices/calendarSlice";
import {
  toggleEventModal,
  setEventModalType,
} from "@/store/slices/modalsSlice";

import {
  Paper,
  Popper,
  Fade,
  Backdrop,
  Box,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";

import { Close, DeleteOutline, EditOutlined } from "@mui/icons-material";

import { GuestsList } from "@/components/module/Calendar/components/EventModal/components";

import { format, fromUnixTime } from "date-fns";
import type { CalendarEvent } from "@/types";

import styles from "./EventPoper.module.sass";

interface Props {
  //
  event: CalendarEvent;
  open: boolean;
  onClose: (e?: any) => void;
  anchorEl: any;
}

export const EventPopper = (props: Props) => {
  //
  const { event, open, onClose, anchorEl } = props;

  const dispatch = useAppDispatch();

  const handleEdit = () => {
    //
    dispatch(setSelectedEvent(event));
    dispatch(setEventModalType("update"));
    dispatch(toggleEventModal());
    onClose();
  };

  const handleDelete = () => {
    //
    dispatch(deleteEvent(event.id));
    onClose();
  };

  return (
    <>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={onClose}
      >
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={"left-start"}
          transition
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps}>
              <Paper
                className={styles.Wrapper}
                onClick={(e) => e.stopPropagation()}
              >
                <Stack
                  className={styles.Header}
                  direction="row"
                  justifyContent="end"
                >
                  <IconButton size="small" onClick={() => handleDelete()}>
                    <DeleteOutline />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleEdit()}>
                    <EditOutlined />
                  </IconButton>
                  <IconButton size="small" onClick={onClose}>
                    <Close />
                  </IconButton>
                </Stack>

                <Box className={styles.Content}>
                  <Box
                    className={styles.Border}
                    sx={{ background: event.color }}
                  />
                  <Typography
                    className={styles.Title}
                    noWrap
                    variant="h5"
                    component="h2"
                  >
                    {event.title}
                  </Typography>
                  <Typography className={styles.Date} variant="h6">
                    {format(fromUnixTime(event.date), "iiii, MMMM d")}
                  </Typography>
                  <Typography
                    className={styles.Description}
                    paragraph
                    variant="body2"
                    mt={1}
                    mb={1}
                    sx={{ wordBreak: "break-all" }}
                  >
                    {event.description}
                  </Typography>
                  <GuestsList values={event.guests} />
                </Box>
              </Paper>
            </Fade>
          )}
        </Popper>
      </Backdrop>
    </>
  );
};
