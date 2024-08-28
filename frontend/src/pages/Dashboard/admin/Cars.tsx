import {
  Avatar,
  Button,
  Modal,
  Space,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import { CarProps, ErrorProps, ResponseProps } from "../../../types";
import {
  useDeleteCarMutation,
  useGetAllCarsQuery,
  useUpdateCarInfoMutation,
} from "../../../redux/features/car/carApi";
import AppModal from "../../../components/ui/AppMoal";
import { FilePenLine, Trash } from "lucide-react";
import { CAR_STATUS } from "../../../constants/carStatus";
import { toast } from "sonner";
import AppForm from "../../../components/form/AppForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import AppInput from "../../../components/form/AppInput";
import AppSelect from "../../../components/form/AppSelect";
import { colorOptions } from "../../../constants/colors";

interface UpdateCarInfoProps {
  carInfo: CarProps;
}

type TableDataProps = Pick<
  CarProps,
  "_id" | "name" | "color" | "pricePerHour" | "isElectric" | "status"
>;

const Cars = () => {
  const { data: carsDara, isFetching: getCarsFetching } =
    useGetAllCarsQuery(undefined);

  const [deleteCar, { isLoading: deleteLoading }] = useDeleteCarMutation();

  const tableData = carsDara?.data?.map(
    ({ _id, name, color, status, pricePerHour, isElectric }: CarProps) => ({
      key: _id,
      _id,
      name,
      color,
      pricePerHour,
      status,
      isElectric,
    })
  );

  const handleCarDelete = async (carId: string) => {
    console.log(carId);
    const toastId = "Delete a car";
    try {
      const res = (await deleteCar(carId)) as ResponseProps<CarProps>;
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Car deleted successfully!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      const err = error as ErrorProps;
      toast.error(err.data.message, { id: toastId, duration: 2000 });
    }
  };

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
      title: "Color",
      key: "code",
      dataIndex: "color",
      render: (color) => {
        const borderColor = color === "White" ? "black" : "transparent";
        return (
          <Avatar
            style={{
              backgroundColor: color,
              verticalAlign: "middle",
              borderColor: borderColor,
            }}
            size="small"
          >
            {/* {color} */}
          </Avatar>
        );
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        const capitalizeFirstLetter =
          status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

        return (
          <Tag color={status === "available" ? "success" : "default"}>
            {/* {status} */}
            {capitalizeFirstLetter}
          </Tag>
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
            <UpdateCarInfo carInfo={item} />
            {/* <Link to={item._id}>
              <Button>{<FilePenLine size={16} />}</Button>
            </Link> */}
            <AppModal
              title="Are you sure?"
              disabled={item.status === CAR_STATUS.unavailable}
              content="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
              triggerText={<Trash size={16} />}
              onOk={() => handleCarDelete(item._id)}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      loading={getCarsFetching || deleteLoading}
      columns={columns}
      dataSource={tableData}
      pagination={false}
      style={{ paddingBottom: "20px" }}
    />
  );
};

const UpdateCarInfo = ({ carInfo }: UpdateCarInfoProps) => {
  // console.log(carInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateCarInfo] = useUpdateCarInfoMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Update car info
  const handleUpdateCarInfo: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "Update car info";
    const isElectric = data?.isElectric === "Yes" ? true : false;
    const pricePerHour = Number(data?.pricePerHour);
    const updateData = {
      carId: carInfo._id,
      data: {
        ...data,
        isElectric,
        pricePerHour,
      },
    };

    try {
      const res = (await updateCarInfo(updateData)) as ResponseProps<CarProps>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        setIsModalOpen(false);
        toast.success("Car updated successfully!", {
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
      <Button onClick={showModal}>{<FilePenLine size={16} />}</Button>

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
