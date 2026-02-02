import { configureStore } from "@reduxjs/toolkit";
import settingsSlice from "./slice/settingsSlice";
import permissionSLice from "./slice/permissionSlice";

export const store = configureStore({
  reducer: {
    settings: settingsSlice,
    permissions: permissionSLice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
