import { Button, Space, Table, TableColumnsType, Tag } from "antd";
import { DollarSign, Undo2 } from "lucide-react";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { ErrorProps, ResponseProps } from "../../../../types";
import {
  useGetAllBookingsQuery,
  useReturnCarMutation,
} from "../../../../redux/features/book/bookApi";
import { BookingProps } from "../../../../types/booking.types";
import { formatDateWithSuffix } from "../../../../utils/formatDateWithSuffix";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MakePaymentModal from "./MakePaymentModal";
import ReturnCarModal from "./ReturnCarModal";

const stripePromise = loadStripe(
  "pk_test_51L12h7FFRkXzSfTm4BbhvSh2a8xAedX62QCXlwx8NRcJwdUk8SVzF8josy9Vdg1SNXAgHU2PE3JnIh6EXLGTGZ1Y00o92XbEAH"
);

type TableDataProps = Pick<
  BookingProps,
  "_id" | "date" | "endTime" | "totalCost" | "isPaid"
> & {
  userName: BookingProps["user"]["name"];
  carName: BookingProps["car"]["name"];
  pricePerHour: BookingProps["car"]["pricePerHour"];
  isElectric: BookingProps["car"]["isElectric"];
};

const Bookings = () => {
  const { data: BookingsDara, isFetching: getBookingsFetching } =
    useGetAllBookingsQuery(undefined);
  const [returnCar] = useReturnCarMutation();

  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isReturnCarModalOpen, setReturnCarModalOpen] = useState(false);

  const handlePaymentModalOpen = () => setPaymentModalOpen(true);
  const handlePaymentModalClose = () => setPaymentModalOpen(false);

  const handleReturnCarModalOpen = () => setReturnCarModalOpen(true);
  const handleReturnCarModalClose = () => setReturnCarModalOpen(false);

  // Handle return car func
  const handleReturnCar: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "Return car";

    try {
      const res = (await returnCar(data)) as ResponseProps<BookingProps>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        setReturnCarModalOpen(false);
        setPaymentModalOpen(true);
        toast.success("Car returned successfully!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      const err = error as ErrorProps;
      toast.error(err.data.message, { id: toastId, duration: 2000 });
    }
  };

  const tableData = BookingsDara?.data?.map(
    ({
      _id,
      user: { name: userName },
      car: { name, pricePerHour },
      totalCost,
      startTime,
      endTime,
      date,
      isPaid,
    }: BookingProps) => ({
      key: _id,
      _id,
      userName,
      name,
      date,
      startTime,
      endTime,
      pricePerHour,
      totalCost,
      isPaid,
    })
  );

  const columns: TableColumnsType<TableDataProps> = [
    {
      title: "User name",
      key: "userName",
      dataIndex: "userName",
    },
    {
      title: "Car name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Price (hourly)",
      key: "pricePerHour",
      dataIndex: "pricePerHour",
      render: (price) => {
        return <p>৳{price}</p>;
      },
    },
    {
      title: "Booking date",
      key: "date",
      dataIndex: "date",
      render: (date) => {
        return <p>{formatDateWithSuffix(date)}</p>;
      },
    },
    {
      title: "Start time",
      key: "startTime",
      dataIndex: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (endTime: string | null) => {
        return endTime ? endTime : "-";
      },
    },
    {
      title: "Payment status",
      key: "isPaid",
      dataIndex: "isPaid",
      render: (isPaid) => {
        return (
          <Tag color={isPaid ? "green" : "red"}>
            {isPaid ? "Success" : "Pending"}
          </Tag>
        );
      },
    },
    {
      title: "Total cost",
      key: "totalCost",
      dataIndex: "totalCost",
      render: (totalCost: number | null) => {
        return <p>{totalCost ? `৳${totalCost}` : "-"}</p>;
      },
    },
    {
      title: "Action",
      key: "X",
      width: "15%",
      render: (item) => {
        const shouldShowPaymentModal = item.endTime && item.totalCost;

        return (
          <Space>
            {shouldShowPaymentModal ? (
              <>
                <Button onClick={handlePaymentModalOpen} disabled={item.isPaid}>
                  <DollarSign size={16} />
                  Make Payment
                </Button>
                <Elements stripe={stripePromise}>
                  <MakePaymentModal
                    isOpen={isPaymentModalOpen}
                    onClose={handlePaymentModalClose}
                    BookingInfo={item}
                  />
                </Elements>
              </>
            ) : (
              <>
                <Button onClick={handleReturnCarModalOpen}>
                  {" "}
                  <Undo2 size={16} />
                  Return Car
                </Button>
                <ReturnCarModal
                  isOpen={isReturnCarModalOpen}
                  onClose={handleReturnCarModalClose}
                  onReturnCar={handleReturnCar}
                  bookingInfo={item}
                />
              </>
            )}
            {/* <MakePaymentModal /> */}
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      loading={getBookingsFetching}
      columns={columns}
      dataSource={tableData}
      pagination={false}
      style={{ paddingBottom: "20px" }}
    />
  );
};

export default Bookings;
