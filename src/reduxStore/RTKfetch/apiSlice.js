import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getHostels } from "../slices/hostelSlice";
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
} = dataApi;
