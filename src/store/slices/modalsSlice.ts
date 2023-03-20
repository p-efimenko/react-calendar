import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ModalsState {
  event: EventModal;
}

type EventModal = {
  visible: boolean;
  type: "create" | "update";
};

const initialState: ModalsState = {
  event: {
    visible: false,
    type: "create",
  },
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    toggleEventModal: (state) => {
      state.event.visible = !state.event.visible;
      if (!state.event.visible) {
        state.event.type = "create";
      }
    },
    setEventModalType: (state, action: PayloadAction<"create" | "update">) => {
      state.event.type = action.payload;
    },
  },
});

export const { toggleEventModal, setEventModalType } = modalsSlice.actions;

export default modalsSlice.reducer;
