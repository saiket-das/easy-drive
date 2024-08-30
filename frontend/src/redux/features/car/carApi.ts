import { baseApi } from "../../api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add new car
    addNewCars: builder.mutation({
      query: (carData) => ({
        url: "/cars",
        method: "POST",
        body: carData,
      }),
      invalidatesTags: ["car"],
    }),

    // Get all cars
    getAllCars: builder.query({
      query: () => ({
        url: "/cars",
        method: "GET",
      }),
      providesTags: ["car"],
    }),

    // Get a car's info
    getSingleCar: builder.query({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
    }),

    // Update a carinfo
    updateCarInfo: builder.mutation({
      query: (args) => ({
        url: `/cars/${args.carId}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["car"],
    }),

    // Delete a car
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["car"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddNewCarsMutation,
  useGetAllCarsQuery,
  useGetSingleCarQuery,
  useUpdateCarInfoMutation,
  useDeleteCarMutation,
} = carApi;
