import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Make paymennt
    makePayment: builder.mutation({
      query: (paymentData) => ({
        url: "/payments/create-payment",
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["booking"],
    }),
  }),
  overrideExisting: false,
});

export const { useMakePaymentMutation } = paymentApi;
