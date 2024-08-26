import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

type AppTimePickerProps = {
  name: string;
  label?: string;
  placeholder?: string;
};

const AppTimePicker = ({ name, label, placeholder }: AppTimePickerProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <TimePicker
              format="HH:mm"
              {...field}
              size="large"
              style={{ width: "100%" }}
              placeholder={placeholder}
            />
            {error && <small style={{ color: "red" }}> {error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default AppTimePicker;
