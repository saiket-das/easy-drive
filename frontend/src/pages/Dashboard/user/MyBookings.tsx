import { Table, TableColumnsType, Tag } from "antd";
import { useGetAllMyBookingsQuery } from "../../../redux/features/book/bookApi";
import { BookingProps } from "../../../types/booking.types";
import { formatDateWithSuffix } from "../../../utils/formatDateWithSuffix";

type TableDataProps = Pick<BookingProps, "_id" | "date"> & {
  carName: BookingProps["car"]["name"];
  pricePerHour: BookingProps["car"]["pricePerHour"];
  isElectric: BookingProps["car"]["isElectric"];
};

const MyBookings = () => {
  const { data: BookingsDara, isFetching: getBookingsFetching } =
    useGetAllMyBookingsQuery(undefined);

  const tableData = BookingsDara?.data?.map(
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
    },
    {
      title: "Payment status",
      key: "date",
      dataIndex: "date",
      render: () => {
        return (
          <Tag color="red">Pending</Tag>
          // <Badge
          //   className="site-badge-count-109"
          //   count="Pending"
          //   style={{ backgroundColor: "red" }}
          // />
        );
      },
    },

    {
      title: "Booking status",
      key: "startTime",
      dataIndex: "startTime",
      render: () => {
        return <Tag color="green">Active</Tag>;
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

export default MyBookings;
