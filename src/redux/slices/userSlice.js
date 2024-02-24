import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  files: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
    },
    setFiles: (state, action) => {
      state.files.push(action.payload);
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFiles,
} = userSlice.actions;
export default userSlice.reducer;
