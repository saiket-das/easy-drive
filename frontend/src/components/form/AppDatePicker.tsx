import { DatePicker, Form } from "antd";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import { Controller } from "react-hook-form";

type AppDatePickerProps = {
  name: string;
  label?: string;
  placeholder?: string;
};

const AppDatePicker = ({ name, label, placeholder }: AppDatePickerProps) => {
  const disabledDate = (current: Dayjs) => {
    // Disable all dates except today
    return current && !current.isSame(dayjs(), "day");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <DatePicker
              {...field}
              size="large"
              style={{ width: "100%" }}
              placeholder={placeholder}
              disabledDate={disabledDate}
              defaultValue={moment()}
            />
            {error && <small style={{ color: "red" }}> {error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default AppDatePicker;
