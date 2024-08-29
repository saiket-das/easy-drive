import { Form, TimePicker, TimePickerProps } from "antd";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

type AppTimePickerProps = {
  name: string;
  label?: string;
  placeholder?: string;
};

const AppTimePicker = ({ name, label, placeholder }: AppTimePickerProps) => {
  const now = dayjs();
  const currentHour = now.hour();
  const currentMinute = now.minute();

  // Function to disable past times
  const disabledTime: TimePickerProps["disabledTime"] = (date) => {
    if (!date) return {};
    const hour = date.hour();

    return {
      disabledHours: () => {
        if (hour > currentHour) return [];
        return hour === currentHour
          ? Array.from({ length: currentHour }).map((_, i) => i)
          : [];
      },
      disabledMinutes: () => {
        if (hour < currentHour) return [];
        if (hour === currentHour)
          return Array.from({ length: currentMinute }).map((_, i) => i);
        return [];
      },
    };
  };

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
              disabledTime={disabledTime}
            />
            {error && <small style={{ color: "red" }}> {error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default AppTimePicker;
