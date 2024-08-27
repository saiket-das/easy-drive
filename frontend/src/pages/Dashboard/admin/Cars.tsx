import { Avatar, Button, Space, Table, TableColumnsType, Tag } from "antd";
import { CarProps } from "../../../types";
import { useGetAllCarsQuery } from "../../../redux/features/car/carApi";
import { Link } from "react-router-dom";
import AppModal from "../../../components/ui/AppMoal";
import { FilePenLine, Trash } from "lucide-react";
import { CAR_STATUS } from "../../../constants/carStatus";

type TableDataProps = Pick<
  CarProps,
  "_id" | "name" | "color" | "pricePerHour" | "isElectric" | "status"
>;

const Cars = () => {
  const { data: courseData, isFetching: getCourseFetching } =
    useGetAllCarsQuery(undefined);
  const tableData = courseData?.data?.map(
    ({ _id, name, color, status, pricePerHour, isElectric }: CarProps) => ({
      key: _id,
      name,
      color,
      pricePerHour,
      status,
      isElectric,
    })
  );

  const handleDelete = async (carId: string) => {
    // const toastId = "delete a student";
    // try {
    //   const res = (await deleteStudent(
    //     studentId
    //   )) as ResponseProps<StudentProps>;
    //   if (res.error) {
    //     toast.error(res?.error?.data?.message, { id: toastId });
    //   } else {
    //     toast.success("Student deleted successfully!", {
    //       id: toastId,
    //       duration: 2000,
    //     });
    //   }
    // } catch (err) {
    //   toast.error("Something went wrong", { id: toastId, duration: 2000 });
    // }
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
        console.log(color);
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
            <Link to={item._id}>
              <Button>{<FilePenLine size={16} />}</Button>
            </Link>

            <AppModal
              title="Are you sure?"
              disabled={item.status === CAR_STATUS.unavailable}
              content="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
              triggerText={<Trash size={16} />}
              onOk={() => handleDelete(item._id)}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <Table
      loading={getCourseFetching}
      columns={columns}
      dataSource={tableData}
      pagination={false}
      style={{ paddingBottom: "20px" }}
    />
  );
};

// const UpdateCar = ({ courseInfo }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { data: facultyData, isFetching: getFacultyFetching } =
//     useGetAllFacultiesQuery(undefined);

//   const [assignCourseToFaculties] = useAssignCourseToFacultiesMutation();

//   const facultyOptions = facultyData?.data?.map((item) => ({
//     value: item._id,
//     label: `${item.name.firstName} ${item.name.lastName}`,
//   }));

//   const showModal = () => {
//     setIsModalOpen(true);
//   };
//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   // Assign course to faculties
//   // const handleAssignFaculty: SubmitHandler<FieldValues> = async (data) => {
//   //   const toastId = "Create new course";
//   //   const assignCourseToFacultiesData = {
//   //     courseId: courseInfo.key,
//   //     data: data,
//   //   };

//   //   try {
//   //     const res = (await assignCourseToFaculties(
//   //       assignCourseToFacultiesData
//   //     )) as ResponseProps<CourseProps>;

//   //     if (res.error) {
//   //       toast.error(res.error.data.message, { id: toastId });
//   //     } else {
//   //       toast.success("Course assigned successfully!", {
//   //         id: toastId,
//   //         duration: 2000,
//   //       });
//   //     }
//   //   } catch (err) {
//   //     toast.error("Something went wrong", { id: toastId, duration: 2000 });
//   //   }
//   // };

//   return (
//     <>
//       <Button onClick={showModal}>Add Faculty</Button>
//       <Modal
//         title="Assign course to faculties"
//         open={isModalOpen}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <AppForm onSubmit={handleAssignFaculty}>
//           <AppSelect
//             name="faculties"
//             label="Faculties"
//             mode="multiple"
//             options={facultyOptions}
//             isLoading={getFacultyFetching}
//             placeholder="Choose pre-requisite Cars"
//           />

//           <Button htmlType="submit" style={{ width: "100%" }} size="large">
//             Assign Faculty
//           </Button>
//         </AppForm>
//       </Modal>
//     </>
//   );
// };

export default Cars;
