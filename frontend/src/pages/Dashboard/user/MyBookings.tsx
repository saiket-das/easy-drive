import { Table, TableColumnsType, Tag } from "antd";
import { useGetAllMyBookingsQuery } from "../../../redux/features/book/bookApi";
import { BookingProps } from "../../../types/booking.types";
import { formatDateWithSuffix } from "../../../utils/formatDateWithSuffix";

type TableDataProps = Pick<
  BookingProps,
  "_id" | "date" | "totalCost" | "isPaid"
> & {
  carName: BookingProps["car"]["name"];
  pricePerHour: BookingProps["car"]["pricePerHour"];
  isElectric: BookingProps["car"]["isElectric"];
};

const MyBookings = () => {
  const { data: BookingsDara, isFetching: getBookingsFetching } =
    useGetAllMyBookingsQuery(undefined);

  const tableData = BookingsDara?.data?.map(
    ({
      _id,
      isPaid,
      date,
      startTime,
      endTime,
      totalCost,
      car: { name, pricePerHour },
    }: BookingProps) => ({
      key: _id,
      _id,
      name,
      isPaid,
      date,
      startTime,
      endTime,
      totalCost,
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
      title: "Booking status",
      key: "isPaid",
      dataIndex: "isPaid",
      render: (isPaid) => {
        return (
          <Tag color={isPaid ? "gray" : "green"}>
            {isPaid ? "Returned" : "Active"}
          </Tag>
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

export default MyBookings;
