import { Button, Modal, Space, Table, TableColumnsType, Tag } from "antd";
import { ErrorProps, ResponseProps } from "../../../types";
import { Undo2 } from "lucide-react";
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

type TableDataProps = Pick<BookingProps, "_id" | "date"> & {
  carName: BookingProps["car"]["name"];
  pricePerHour: BookingProps["car"]["pricePerHour"];
  isElectric: BookingProps["car"]["isElectric"];
};

const Bookings = () => {
  const { data: BookingsDara, isFetching: getBookingsFetching } =
    useGetAllBookingsQuery(undefined);

  const tableData = BookingsDara?.data?.map(
    ({
      _id,
      car: { name, pricePerHour },
      startTime,
      endTime,
      date,
    }: BookingProps) => ({
      key: _id,
      _id,
      name,
      date,
      startTime,
      endTime,
      pricePerHour,
    })
  );

  const columns: TableColumnsType<TableDataProps> = [
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
      title: "End time",
      key: "endTime",
      dataIndex: "endTime",
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
      title: "Action",
      key: "X",
      width: "15%",
      render: (item) => {
        return (
          <Space>
            <ReturnCar bookingInfo={item} />
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

const ReturnCar = ({ bookingInfo }) => {
  // { bookingInfo: TableDataProps }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [returnCar] = useReturnCarMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const defaultValues = {
    name: bookingInfo?.name,
  };

  console.log(bookingInfo);

  // Handle return car func
  const handleReturnCar: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "Return car";
    const endTime = convertToHHMMFormat(data.endTime);
    const returnCarData = {
      bookingId: bookingInfo._id,
      endTime,
    };
    console.log(returnCarData);

    try {
      const res = (await returnCar(
        returnCarData
      )) as ResponseProps<BookingProps>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        setIsModalOpen(false);
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

  return (
    <>
      <Button onClick={showModal}>{<Undo2 size={16} />} Return Car</Button>
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
          <AppTimePicker name="endTime" label="End time" />

          <Button htmlType="submit" style={{ width: "100%" }} size="large">
            Update Info
          </Button>
        </AppForm>
      </Modal>
    </>
  );
};

export default Bookings;
