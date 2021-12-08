import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dataApi = createApi({
  reducerPath: "dataAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getAllHostels: builder.query({
      query: (name) => "/hostels",
    }),
    getHostelSearch: builder.query({
      query: (name) => `/hostels/search/${name}`,
    }),
    auth: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    getAuthorization: builder.query({
      query: (name) => ({
        url: `/login`,
        method: "POST",
        body: name,
      }),
    }),
  }),
});

export const {
  useGetAllHostelsQuery,
  useAuthMutation,
  useGetHostelSearchQuery,
  useGetAuthorizationQuery,
} = dataApi;
