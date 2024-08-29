import { Form, TimePicker, TimePickerProps } from "antd";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

type AppTimePickerProps = {
  name: string;
  label?: string;
  placeholder?: string;
  disablePreviousTime?: string;
};

const AppTimePicker = ({
  name,
  label,
  placeholder,
  disablePreviousTime = "",
}: AppTimePickerProps) => {
  // Determine the base time for disabling previous times
  const now = dayjs();
  const disableFromTime = disablePreviousTime
    ? dayjs(disablePreviousTime, "HH:mm")
    : now; // Default to current time if no prop is provided

  // Function to disable past times
  const disabledTime: TimePickerProps["disabledTime"] = (date) => {
    if (!date) return {};
    const isAfterDisableTime = date.isAfter(disableFromTime, "minute");

    return {
      disabledHours: () => {
        if (isAfterDisableTime) return [];
        return Array.from({ length: disableFromTime.hour() }).map((_, i) => i);
      },
      disabledMinutes: () => {
        if (isAfterDisableTime) return [];
        return Array.from({ length: disableFromTime.minute() }).map(
          (_, i) => i
        );
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
