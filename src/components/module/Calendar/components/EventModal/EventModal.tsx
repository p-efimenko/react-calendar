import React, { useEffect } from "react";

import {
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

import { Form } from "@/components/ui";

import { GuestsForm, SelectDate, SelectColor } from "./components";
import { useAppDispatch, useAppSelector } from "@/store";

import {
  setSelectedCell,
  setSelectedEvent,
} from "@/store/slices/calendarSlice";

import { createEvent, updateEvent } from "@/store/slices/eventsSlice";

import { toggleEventModal } from "@/store/slices/modalsSlice";

import {
  FormProvider,
  useForm,
  Controller,
  SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import schema from "./validation";

import { fromUnixTime, getUnixTime, isValid as isValidDate } from "date-fns";

type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  title: "",
  description: "",
  guests: [],
  date: null,
  color: "#7986cb",
};

export const EventModal: React.FC = () => {
  //
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.modals.event.visible);
  const type = useAppSelector((state) => state.modals.event.type);
  const event = useAppSelector((state) => state.calendar.selectedEvent);

  const isCreate = type === "create";
  const isUpdate = type === "update";

  const methods = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
    resolver: zodResolver(schema),
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    //formState: { errors },
  } = methods;

  useEffect(() => {
    if (event) {
      setValue("title", event.title);
      setValue("description", event.description);
      setValue("guests", event.guests);
      setValue("date", fromUnixTime(event.date));
      setValue("color", event.color);
    }
  }, [event]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    //
    if (isCreate) {
      dispatch(
        createEvent({
          ...data,
          date: getUnixTime(data.date as Date),
        })
      );
    }

    if (isUpdate) {
      dispatch(
        updateEvent({
          // @ts-ignore
          id: event.id,
          ...data,
          date: getUnixTime(data.date as Date),
        })
      );
    }

    dispatch(toggleEventModal());
  };

  const onClose = () => {
    //
    dispatch(toggleEventModal());
    dispatch(setSelectedCell(null));
    dispatch(setSelectedEvent(null));
  };

  const handleResetForm = () => {
    //
    clearErrors();
    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionProps={{
        onExited: () => handleResetForm(),
      }}
      fullWidth={true}
      maxWidth="xs"
    >
      <FormProvider {...methods}>
        <DialogTitle sx={{ borderBottom: "1px solid #dadce0" }}>
          {isCreate ? "Create Event" : "Update Event"}
        </DialogTitle>

        <DialogContent>
          <Box pt={3}>
            <Form id="create-event" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        id="title"
                        label="Title"
                        variant="outlined"
                        fullWidth
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <SelectDate />
                </Grid>

                <Grid item xs={12}>
                  <GuestsForm />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        id="description"
                        label="Description"
                        variant="outlined"
                        multiline
                        minRows={2}
                        maxRows={4}
                        fullWidth
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <SelectColor />
                </Grid>
              </Grid>
            </Form>
          </Box>
        </DialogContent>

        <DialogActions sx={{ borderTop: "1px solid #dadce0" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" type="submit" form="create-event">
            Save
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
