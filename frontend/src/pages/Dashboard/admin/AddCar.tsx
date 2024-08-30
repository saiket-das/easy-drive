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
import AppFileUpload from "../../../components/form/AppFileUpload";
import uploadToCloudinary from "../../../utils/uploadToCloudinary";
import { useState } from "react";

const AddCar = () => {
  const [addNewCar, { isLoading }] = useAddNewCarsMutation();
  const [imageUploading, setImageUploading] = useState(false);

  // Create a new car
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "Update car info";
    const isElectric = data?.isElectric === "Yes" ? true : false;
    const pricePerHour = Number(data?.pricePerHour);

    try {
      setImageUploading(true);
      const uploadPromises = Array.from(data.images).map((file) =>
        uploadToCloudinary(file as File)
      );
      const uploadResults = await Promise.all(uploadPromises);
      const imageUrls = uploadResults.map((result) => result);
      setImageUploading(false);
      const newData = {
        ...data,
        isElectric,
        pricePerHour,
        images: imageUrls,
      };
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
      setImageUploading(false);
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
              <AppFileUpload name="images" label="Upload Images" />
            </Col>

            {/* <Col span={24} lg={{ span: 6 }} md={{ span: 12 }}>
              <Controller
                name="image1"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Image 1">
                    <Input
                      type="file"
                      value={value?.fileName}
                      size="large"
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={24} lg={{ span: 6 }} md={{ span: 12 }}>
              <Controller
                name="image2"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Image 2">
                    <Input
                      type="file"
                      value={value?.fileName}
                      size="large"
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={24} lg={{ span: 6 }} md={{ span: 12 }}>
              <Controller
                name="image3"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Image 3">
                    <Input
                      type="file"
                      value={value?.fileName}
                      size="large"
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={24} lg={{ span: 6 }} md={{ span: 12 }}>
              <Controller
                name="image4"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Image 4">
                    <Input
                      type="file"
                      value={value?.fileName}
                      size="large"
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col> */}

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
            loading={isLoading || imageUploading}
            iconPosition="start"
          >
            {isLoading || imageUploading ? "Loading..." : "Add new car"}
          </Button>
        </AppForm>
      </Col>
    </Flex>
  );
};

export default AddCar;
