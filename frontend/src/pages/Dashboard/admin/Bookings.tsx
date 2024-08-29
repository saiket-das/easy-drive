import { Button, Modal, Space, Table, TableColumnsType, Tag } from "antd";
import { ErrorProps, ResponseProps } from "../../../types";
import { DollarSign, Undo2 } from "lucide-react";
import { toast } from "sonner";
import AppForm from "../../../components/form/AppForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import AppInput from "../../../components/form/AppInput";
import {
  useGetAllBookingsQuery,
  useReturnCarMutation,
} from "../../../redux/features/book/bookApi";
import { BookingProps } from "../../../types/booking.types";
import { formatDateWithSuffix } from "../../../utils/formatDateWithSuffix";
import AppTimePicker from "../../../components/form/AppTimePicker";
import { convertToHHMMFormat } from "../../../utils/convertToHHMMFormat";

type TableDataProps = Pick<
  BookingProps,
  "_id" | "date" | "endTime" | "totalCost"
> & {
  userName: BookingProps["user"]["name"];
  carName: BookingProps["car"]["name"];
  pricePerHour: BookingProps["car"]["pricePerHour"];
  isElectric: BookingProps["car"]["isElectric"];
};

interface BookingInfoProps {
  _id: string;
  name: string;
  pricePerHour: number;
  date: string;
  startTime: string;
  endTime: string;
  totalCost: number;
}

const Bookings = () => {
  const { data: BookingsDara, isFetching: getBookingsFetching } =
    useGetAllBookingsQuery(undefined);

  const tableData = BookingsDara?.data?.map(
    ({
      _id,
      user: { name: userName },
      car: { name, pricePerHour },
      totalCost,
      startTime,
      endTime,
      date,
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
      key: "date",
      dataIndex: "date",
      render: () => {
        return <Tag color="red">Pending</Tag>;
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
        return (
          <Space>
            <ReturnCar bookingInfo={item} />
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

const ReturnCar = ({ bookingInfo }: { bookingInfo: BookingInfoProps }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [returnCar] = useReturnCarMutation();

  const defaultValues = {
    name: bookingInfo?.name,
  };

  const showModal = () => {
    if (bookingInfo.endTime && bookingInfo.totalCost) {
      setIsPaymentModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsPaymentModalOpen(false);
  };

  const handlePaymentModalClose = () => {
    setIsPaymentModalOpen(false);
  };

  // Handle return car func
  const handleReturnCar: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "Return car";
    const endTime = convertToHHMMFormat(data.endTime);
    const returnCarData = {
      bookingId: bookingInfo._id,
      endTime,
    };

    try {
      const res = (await returnCar(
        returnCarData
      )) as ResponseProps<BookingProps>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        setIsModalOpen(false);
        setIsPaymentModalOpen(true);
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

  const Icon =
    bookingInfo.endTime && bookingInfo.totalCost ? DollarSign : Undo2;

  return (
    <>
      <Button onClick={showModal}>
        {<Icon size={16} />}{" "}
        {bookingInfo.endTime && bookingInfo.totalCost
          ? "Payment"
          : "Return Car"}
      </Button>
      <Modal
        title={
          <div style={{ textAlign: "center", width: "100%" }}>Return Car</div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <AppForm onSubmit={handleReturnCar} defaultValues={defaultValues}>
          <AppInput type="text" name="name" label="Name" disabled />
          <AppTimePicker
            name="endTime"
            label="End time"
            disablePreviousTime={bookingInfo.startTime}
          />

          <Button htmlType="submit" style={{ width: "100%" }} size="large">
            Return Car
          </Button>
        </AppForm>
      </Modal>
      <MakePaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handlePaymentModalClose}
      />
    </>
  );
};

const MakePaymentModal = ({ isOpen, onClose }) => {
  // Handle payment submission
  const handlePayment: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
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
      <AppForm onSubmit={handlePayment}>
        <AppInput type="text" name="amount" label="Amount" />
        <AppInput
          type="text"
          name="paymentMethod"
          label="Payment Method"
          placeholder="Enter payment method"
        />
        <Button htmlType="submit" style={{ width: "100%" }} size="large">
          Pay Now
        </Button>
      </AppForm>
    </Modal>
  );
};
