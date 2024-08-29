import {
  Badge,
  Button,
  Modal,
  Space,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import { ErrorProps, ResponseProps } from "../../../types";
import { useUpdateCarInfoMutation } from "../../../redux/features/car/carApi";
import { Undo2 } from "lucide-react";
import { toast } from "sonner";
import AppForm from "../../../components/form/AppForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import AppInput from "../../../components/form/AppInput";
import AppSelect from "../../../components/form/AppSelect";
import { colorOptions } from "../../../constants/colors";
import { useGetAllBookingsQuery } from "../../../redux/features/book/bookApi";
import { BookingProps } from "../../../types/booking.types";
import { formatDateWithSuffix } from "../../../utils/formatDateWithSuffix";

type TableDataProps = Pick<BookingProps, "_id" | "date"> & {
  carName: BookingProps["car"]["name"];
  pricePerHour: BookingProps["car"]["pricePerHour"];
  isElectric: BookingProps["car"]["isElectric"];
};

const Cars = () => {
  const { data: carsDara, isFetching: getCarsFetching } =
    useGetAllBookingsQuery(undefined);

  const tableData = carsDara?.data?.map(
    ({ _id, startTime, date, car: { name, pricePerHour } }: BookingProps) => ({
      key: _id,
      _id,
      name,
      date,
      startTime,
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
      render: (startTime) => {
        return <Tag color="green">{startTime}</Tag>;
      },
    },
    {
      title: "Payment status",
      key: "date",
      dataIndex: "date",
      render: () => {
        return (
          <Badge
            className="site-badge-count-109"
            count="No"
            style={{ backgroundColor: "red" }}
          />
        );
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
      loading={getCarsFetching}
      columns={columns}
      dataSource={tableData}
      pagination={false}
      style={{ paddingBottom: "20px" }}
    />
  );
};

const ReturnCar = ({ bookingInfo }: { bookingInfo: BookingProps }) => {
  // console.log(carInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateCarInfo] = useUpdateCarInfoMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Return car
  const handleUpdateCarInfo: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "Update car info";
    const isElectric = data?.isElectric === "Yes" ? true : false;
    const pricePerHour = Number(data?.pricePerHour);
    const updateData = {
      carId: bookingInfo._id,
      data: {
        ...data,
        isElectric,
        pricePerHour,
      },
    };

    try {
      const res = (await updateCarInfo(
        updateData
      )) as ResponseProps<BookingProps>;
      console.log(res);
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
      console.log(error);
      const err = error as ErrorProps;
      toast.error(err.data.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <>
      {/* <Button onClick={showModal}>Add Faculty</Button> */}
      <Button onClick={showModal}>{<Undo2 size={16} />} Return</Button>

      <Modal
        title="Update car info"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <AppForm onSubmit={handleUpdateCarInfo}>
          <AppInput type="text" name="name" label="Name" />
          <AppSelect
            name="color"
            label="Color"
            options={colorOptions}
            placeholder="Choose a color"
          />
          <AppSelect
            name="isElectric"
            label="Electric"
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
            placeholder="Choose a color"
          />
          <AppInput
            type="number"
            name="pricePerHour"
            label="Price per hour"
            placeholder="Enter rental price (hourly)"
          />

          <Button htmlType="submit" style={{ width: "100%" }} size="large">
            Update Info
          </Button>
        </AppForm>
      </Modal>
    </>
  );
};

export default Cars;
