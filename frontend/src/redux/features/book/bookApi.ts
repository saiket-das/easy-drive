import { baseApi } from "../../api/baseApi";
// import { useAppSelector } from "../../hooks";
// import { useCurrentToken } from "../auth/authSlice";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bookCar: builder.mutation({
      query: (args) => {
        if (!args.token) {
          throw new Error("No JWT token available");
        }
        return {
          url: "/bookings",
          method: "POST",
          body: args.data,
          headers: {
            authorization: `Bearer ${args.token}`,
          },
        };
      },
      invalidatesTags: ["car"],
    }),
  }),
  overrideExisting: false, // To avoid overwriting existing endpoints
});

export const { useBookCarMutation } = bookApi;
