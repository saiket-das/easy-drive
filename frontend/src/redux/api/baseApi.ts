import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://car-rental-backend-flax.vercel.app/api",
  }),
  endpoints: () => ({}),
});
