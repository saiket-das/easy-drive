import { toast } from "sonner";
import { Button, Col, Flex, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import AppSelect from "../../../components/form/AppSelect";
import AppForm from "../../../components/form/AppForm";
import AppInput from "../../../components/form/AppInput";
import { colorOptions } from "../../../constants/colors";
import { colorFeatureOptions } from "../../../constants/carFeatures";
import AppTextField from "../../../components/form/AppTextField";
import { useAddNewCarsMutation } from "../../../redux/features/car/carApi";
import { CarProps, ErrorProps, ResponseProps } from "../../../types";

// const defaultValues = {
//   name: "Tesla Model S",
//   description:
//     "A fully electric sedan with advanced technology and high performance.",
//   color: "Red",
// };

const AddCar = () => {
  const [addNewCar, { isLoading }] = useAddNewCarsMutation();

  // Create a new car
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "Update car info";

    const isElectric = data?.isElectric === "Yes" ? true : false;
    const pricePerHour = Number(data?.pricePerHour);
    const newData = {
      ...data,
      isElectric,
      pricePerHour,
    };

    try {
      const res = (await addNewCar(newData)) as ResponseProps<CarProps>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Car added successfully!", {
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
    <Flex justify="center" align="center" style={{ paddingBottom: "20px" }}>
      <Col span={24}>
        <AppForm onSubmit={onSubmit}>
          <Row gutter={[16, 0]}>
            <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
              <AppInput
                type="text"
                name="name"
                label="Car name"
                placeholder="Enter car name"
              />
            </Col>
            <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
              <AppSelect
                name="color"
                label="Color"
                options={colorOptions}
                placeholder="Choose a color"
              />
            </Col>

            <Col span={24}>
              <AppTextField
                type="text"
                name="description"
                label="Car description"
                placeholder="Enter car description"
              />
            </Col>

            <Col span={24}>
              <AppSelect
                name="features"
                label="Car features"
                mode="multiple"
                options={colorFeatureOptions}
                placeholder="Choose car features"
              />
            </Col>
            <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
              <AppInput
                type="number"
                name="pricePerHour"
                label="Rental price (hourly)"
                placeholder="Enter rental pricce (hourly)"
              />
            </Col>
            <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
              <AppSelect
                name="isElectric"
                label="Electric"
                options={[
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ]}
                placeholder="Choose car mode"
              />
            </Col>
          </Row>

          <Button
            htmlType="submit"
            style={{ width: "100%", marginTop: "20px" }}
            size="large"
            loading={isLoading}
            iconPosition="start"
          >
            {isLoading ? "Loading..." : "Add new car"}
          </Button>
        </AppForm>
      </Col>
    </Flex>
  );
};

export default AddCar;
