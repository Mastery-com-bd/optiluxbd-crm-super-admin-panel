import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TPermissionsState = {
  initialKeys: string[];
  selectedKeys: string[];
};

const initialState: TPermissionsState = {
  initialKeys: [],
  selectedKeys: [],
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setInitialPermissions: (state, action: PayloadAction<string[]>) => {
      state.initialKeys = action.payload;
      state.selectedKeys = action.payload;
    },
    togglePermission: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      if (state.selectedKeys.includes(key)) {
        state.selectedKeys = state.selectedKeys.filter((k) => k !== key);
      } else {
        state.selectedKeys.push(key);
      }
    },
    resetPermissions: (state) => {
      state.selectedKeys = state.initialKeys;
    },
  },
});

export const { setInitialPermissions, togglePermission, resetPermissions } =
  permissionsSlice.actions;

export default permissionsSlice.reducer;
export const currentPermissions = (state: RootState) => state.permissions;
