import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleCarQuery } from "../../../redux/features/car/carApi";
import AppForm from "../../../components/form/AppForm";
import AppInput from "../../../components/form/AppInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import AppDatePicker from "../../../components/form/AppDatePicker";
import AppTimePicker from "../../../components/form/AppTimePicker";
import { useBookCarMutation } from "../../../redux/features/book/bookApi";
import { toast } from "sonner";
import ROUTES from "../../../constants/routes";
import { convertToHHMMFormat } from "../../../utils/convertToHHMMFormat";
import AppLoading from "../../../components/ui/AppLoading";
import { useCurrentToken } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/hooks";
import { Button } from "antd";
import { ErrorProps } from "../../../types";

const RentCar = () => {
  const { id } = useParams<{ id: string }>();
  const { data: car, isFetching: getCarFetching } = useGetSingleCarQuery(id);
  const [rentCar, { isLoading: bookingLoading }] = useBookCarMutation();
  const navigate = useNavigate();

  const token = useAppSelector(useCurrentToken);

  if (getCarFetching) {
    return <AppLoading />;
  }

  const { _id, name, color } = car.data;
  const defaultValues = {
    name: name,
    color: color,
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "renting car";

    const rentCarData = {
      data: {
        carId: _id,
        date: data.date,
        startTime: convertToHHMMFormat(data.startTime),
      },
      token,
    };
    try {
      const res = await rentCar(rentCarData).unwrap();
      if (res.error) {
        toast.error(res.data.message, { id: toastId });
      } else {
        toast.success("Booked Successfully!", { id: toastId, duration: 2000 });
        navigate(ROUTES.CARS, { replace: true });
      }
    } catch (error) {
      const err = error as ErrorProps;
      toast.error(err.data.message, { id: toastId, duration: 2000 });
    }
  };
  return (
    <AppForm onSubmit={onSubmit} defaultValues={defaultValues}>
      <div className="py-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <AppInput type="text" name="name" label="Car name" disabled={true} />
          <AppInput
            type="text"
            name="color"
            label="Car color"
            disabled={true}
          />
          <AppDatePicker name="date" label="Date" />
          <AppTimePicker name="startTime" label="Start Time" />

          <Button
            htmlType="submit"
            style={{ width: "100%" }}
            size="large"
            loading={bookingLoading}
            iconPosition="start"
            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {bookingLoading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </div>
    </AppForm>
  );
};

export default RentCar;
