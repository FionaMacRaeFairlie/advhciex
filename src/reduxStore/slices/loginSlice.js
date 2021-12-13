import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  verifyUser: { success: false },
};

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    auth: (state) => {},
    verifyUser: (state, action) => {
      state.verifyUser = action.payload;
    },
    logOut: (state, action) => {
      state.verifyUser = { success: false };
    },
  },
});

export const { auth, verifyUser, logOut } = loginSlice.actions;

export default loginSlice.reducer;
