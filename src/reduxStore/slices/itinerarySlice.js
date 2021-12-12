import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  itinerary: { itinerary: { stages: null } },
  hostel: null,
  path: [],
};

export const ItinerarySlice = createSlice({
  name: "hostelSlice",
  initialState,
  reducers: {
    getItinerary: (state, action) => {
      state.itinerary = action.payload;
    },
    assignHostel: (state, action) => {
      state.hostel = action.payload;
      console.log(action.payload, "----------++");
      state.path.push({
        lat: action.payload[0].location.lat,
        lng: action.payload[0].location.long,
      });
    },
  },
});

export const { getItinerary, assignHostel } = ItinerarySlice.actions;

export default ItinerarySlice.reducer;
