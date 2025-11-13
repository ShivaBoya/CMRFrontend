import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [],
  },
  reducers: {
    pushNotification(state, action) {
      state.list.unshift({
        ...action.payload,
        read: false,
      });
      if (state.list.length > 50) state.list.pop();
    },
    markAllRead(state) {
      state.list = state.list.map((n) => ({ ...n, read: true }));
    },
  },
});

export const { pushNotification, markAllRead } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
