import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getHostels } from "../slices/hostelSlice";
import { assignHostel, getItinerary } from "../slices/itinerarySlice";
import { verifyUser } from "../slices/loginSlice";
export const dataApi = createApi({
  reducerPath: "dataAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getAllHostels: builder.query({
      query: (name) => "/hostels",
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        console.log("updating all hostels State");
        try {
          const { data } = await queryFulfilled;
          console.log(data, "query finished");
          dispatch(getHostels(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    getHostelById: builder.query({
      query: (name) => `/hostels/${name}`,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        console.log("login Query started");
        try {
          const { data } = await queryFulfilled;
          // console.log(data, "query finished");
          dispatch(assignHostel(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    getHostelSearch: builder.query({
      query: (name) => `/hostels/search/${name}`,
    }),
    // auth: builder.mutation({
    //   query: (data) => ({
    //     url: "/login",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    getAuthorization: builder.query({
      query: (name) => ({
        url: `/login`,
        method: "POST",
        body: name,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        console.log("login Query started");
        try {
          const { data } = await queryFulfilled;
          console.log(data, "query finished");
          dispatch(verifyUser(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    getItineraryByUser: builder.query({
      query: (name) => `/itineraries/${name}`,
    }),

    postReview: builder.mutation({
      query: (data) => ({
        url: `hostels/review/${data.hostelId}`,
        method: "POST",
        body: { reviewer: data.name, review: data.description },
      }),
    }),
    postRate: builder.mutation({
      query: (data) => ({
        url: `hostels/rate/${data.hostelId}/${data.rate}`,
        method: "GET",
      }),
    }),
    newUserItinerary: builder.mutation({
      query: (data) => ({
        url: `/itineraries/new/${data}`,
        method: "GET",
      }),
    }),
    newItineraryStage: builder.mutation({
      query: (data) => ({
        url: `/itineraries/stages/new/${data.userName}`,
        method: "Post",
        body: { hostel: data.hostel, nights: data.nights },
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        console.log("storing itinerary in redux store");
        try {
          const { data } = await queryFulfilled;
          // console.log(data, "query finished");
          dispatch(getItinerary(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useGetAllHostelsQuery,
  useAuthMutation,
  useGetHostelSearchQuery,
  useGetAuthorizationQuery,
  useLazyGetHostelSearchQuery,
  usePostReviewMutation,
  useGetHostelByIdQuery,
  usePostRateMutation,
  useNewUserItineraryMutation,
  useNewItineraryStageMutation,
  useGetItineraryByUserQuery,
  useLazyGetHostelByIdQuery,
} = dataApi;
