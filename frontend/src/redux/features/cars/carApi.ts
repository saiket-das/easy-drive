import { baseApi } from "../../api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postCars: builder.mutation({
      query: (carData) => ({
        url: "/carss",
        method: "POST",
        body: carData,
      }),
    }),

    getAllCars: builder.query({
      query: () => ({
        url: "/cars",
        method: "GET",
      }),
    }),

    // <CarsProps[], string>
    getSingleCar: builder.query({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false, // To avoid overwriting existing endpoints
});

export const { usePostCarsMutation, useGetAllCarsQuery, useGetSingleCarQuery } =
  carApi;
