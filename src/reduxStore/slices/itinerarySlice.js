import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  itinerary: { itinerary: { stages: null } },
  hostel: null,
  path: [],
  itineraryExist: false,
  totalDistance: 0,
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
      //console.log(action.payload, "----------++");
      state.path.push({
        lat: action.payload[0].location.lat,
        lng: action.payload[0].location.long,
      });
    },
    itineraryExist: (state) => {
      state.itineraryExist = true;
    },

    resetPathAfterEdit: (state, action) => {
      console.log(
        "this is the action payload youtre trying t o anal",
        action.payload
      );
    },
    totalDistance: (state, action) => {
      state.totalDistance += action.payload;
    },
  },
});

export const {
  getItinerary,
  assignHostel,
  itineraryExist,
  resetPathAfterEdit,
  totalDistance,
} = ItinerarySlice.actions;

export default ItinerarySlice.reducer;
