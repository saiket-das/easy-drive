import { Modal, Button } from "antd";
import AppForm from "../../../../components/form/AppForm";
import AppInput from "../../../../components/form/AppInput";
import AppTimePicker from "../../../../components/form/AppTimePicker";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { convertToHHMMFormat } from "../../../../utils/convertToHHMMFormat";

export interface BookingInfoProps {
  _id: string;
  name: string;
  pricePerHour: number;
  date: string;
  startTime: string;
  endTime: string;
  totalCost: number;
}

interface ReturnCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReturnCar: SubmitHandler<FieldValues>;
  bookingInfo: BookingInfoProps;
}

const ReturnCarModal = ({
  isOpen,
  onClose,
  onReturnCar,
  bookingInfo,
}: ReturnCarModalProps) => {
  const defaultValues = {
    name: bookingInfo?.name,
  };

  const handleReturnCar: SubmitHandler<FieldValues> = (data) => {
    const endTime = convertToHHMMFormat(data.endTime);

    const returnCarData = {
      bookingId: bookingInfo._id,
      endTime,
    };
    onReturnCar(returnCarData);
  };

  return (
    <Modal
      title={
        <div style={{ textAlign: "center", width: "100%" }}>Return Car</div>
      }
      open={isOpen}
      onCancel={onClose}
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
  );
};

export default ReturnCarModal;
