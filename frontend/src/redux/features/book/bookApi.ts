import { baseApi } from "../../api/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Rent a car
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

    // Get all bookings
    getAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      providesTags: ["car"],
    }),
  }),

  overrideExisting: false, // To avoid overwriting existing endpoints
});

export const { useBookCarMutation, useGetAllBookingsQuery } = bookApi;
