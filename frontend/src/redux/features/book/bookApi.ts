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

    // Get all bookings (Admin)
    getAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      providesTags: ["booking"],
    }),

    // Get all bookings
    getAllMyBookings: builder.query({
      query: () => ({
        url: "/bookings/my-bookings",
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useBookCarMutation,
  useGetAllBookingsQuery,
  useGetAllMyBookingsQuery,
} = bookApi;
