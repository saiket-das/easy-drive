import { startSession } from "mongoose";
import httpStatus from "http-status";
import Stripe from "stripe";
import AppError from "../../errors/AppError";
import { BookingModel } from "../booking/booking.model";
import { PaymentProps } from "./payment.interface";
import { PaymentModel } from "./payment.model";
import config from "../../config";

const stripe = new Stripe(config.stripe_secret_key as string);

const createPaymentService = async (payload: PaymentProps) => {
  const { bookingId, amount, paymentMethod } = payload;

  const session = await startSession();
  try {
    session.startTransaction();
    // check is booking exists or not
    const booking = await BookingModel.findById(bookingId);
    if (!booking) {
      throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
    }

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "bdt",
      payment_method: paymentMethod,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    // Create a new payment record
    const payment = {
      bookingId,
      amount: amount / 100,
      currency: "bdt",
      paymentMethod: paymentIntent.payment_method_types[0],
      paymentStatus: paymentIntent.status,
      stripePaymentId: paymentIntent.id,
    };
    const paymentResult = await PaymentModel.create([payment], { session });
    if (!paymentResult) {
      throw new AppError(httpStatus.BAD_REQUEST, "Fail to make payment");
    }

    // Link the payment to the booking
    const updateBookingPaymentStatus = await BookingModel.findByIdAndUpdate(
      bookingId,
      { isPaid: paymentResult[0]._id },
      { session }
    );
    if (!updateBookingPaymentStatus) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Fail to update booking's payment status"
      );
    }

    console.log(paymentResult);

    await session.commitTransaction();
    await session.endSession();
    return { clientSecret: paymentIntent.client_secret };
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

export const PaymentServices = {
  createPaymentService,
};
