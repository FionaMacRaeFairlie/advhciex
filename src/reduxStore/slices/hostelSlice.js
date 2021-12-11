import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: null,
  allHostels: null,
};

export const hostelSlice = createSlice({
  name: "hostelSlice",
  initialState,
  reducers: {
    getHostels: (state, action) => {
      state.allHostels = action.payload;

      //state.data = data;
    },
    selectedHostel: (state, action) => {
      state.data = action.payload;
      //console.log("new state is ->", state);
    },
  },
});

export const { getHostels, selectedHostel } = hostelSlice.actions;

export default hostelSlice.reducer;
