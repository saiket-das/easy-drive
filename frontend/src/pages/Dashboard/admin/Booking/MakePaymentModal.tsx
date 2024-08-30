// MakePaymentModal.jsx
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Modal, Button } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useMakePaymentMutation } from "../../../../redux/features/payment/paymentApi";
import { useState } from "react";
import { BookingInfoProps } from "./ReturnCarModal";
import { toast } from "sonner";

interface MakePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  BookingInfo: BookingInfoProps;
}

const MakePaymentModal = ({
  isOpen,
  onClose,
  BookingInfo,
}: MakePaymentModalProps) => {
  const [MakePayment, { isLoading }] = useMakePaymentMutation();
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment: SubmitHandler<FieldValues> = async (event) => {
    event.preventDefault();

    setProcessing(true);

    const toastId = "Make payment";
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    // Create payment
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    const paymentData = {
      bookingId: BookingInfo._id,
      amount: BookingInfo.totalCost * 100, // Convert to paisa
      paymentMethod: paymentMethod?.id,
    };

    if (error) {
      toast.error(error.message, {
        id: toastId,
        duration: 2000,
      });
      setProcessing(false);
      return;
    }

    try {
      const response = await MakePayment(paymentData).unwrap();
      if (response.error) {
        toast.error(response.error, {
          id: toastId,
          duration: 2000,
        });
        return;
      }

      // Confirm the payment on the client-side
      const { error: confirmError } = await stripe.confirmCardPayment(
        response.data.clientSecret
      );

      if (confirmError) {
        setProcessing(false);
        toast.error("Failed to make payment!", {
          id: toastId,
          duration: 2000,
        });
      } else {
        setProcessing(false);
        onClose();
        toast.success("Payment succesful!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.success("Fail to make payment in stripe", {
        id: toastId,
        duration: 2000,
      });
      setProcessing(false);

      // Handle fetch error
    }
  };

  return (
    <Modal
      title={
        <div style={{ textAlign: "center", width: "100%" }}>Make Payment</div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <div className="mb-10">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Price
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="text"
            name="price"
            id="price"
            value={BookingInfo.totalCost}
            disabled
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-gray-300 ring-inset  focus:ring-inset  sm:text-sm sm:leading-6"
            placeholder="0.00"
          />
        </div>
      </div>
      <form onSubmit={handlePayment}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <Button
          htmlType="submit"
          style={{ width: "100%", marginTop: "20px" }}
          size="large"
          disabled={!stripe}
          loading={isLoading || processing}
        >
          Pay Now
        </Button>
      </form>
    </Modal>
  );
};

export default MakePaymentModal;

/* <AppForm onSubmit={handlePayment} defaultValues={defaultValues}>
        <AppInput
          type="text"
          name="totalCost"
          label="Total amount"
          disabled={true}
        />

        <PaymentElement /> 

        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <Button
          htmlType="submit"
          style={{ width: "100%", marginTop: "20px" }}
          size="large"
        >
          Pay Now
        </Button>
      </AppForm> 

      */
