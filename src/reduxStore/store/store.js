import { configureStore } from "@reduxjs/toolkit";
import loginReducers from "../slices/loginSlice";
import hostelReducer from "../slices/hostelSlice";
import { dataApi } from "../RTKfetch/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
export const store = configureStore({
  reducer: {
    hostels: hostelReducer,
    login: loginReducers,
    [dataApi.reducerPath]: dataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataApi.middleware),
});

setupListeners(store.dispatch);
