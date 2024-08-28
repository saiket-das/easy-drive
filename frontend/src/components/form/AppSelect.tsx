import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type AppSelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  mode?: "multiple" | undefined;
  disabled?: boolean;
  isLoading?: boolean;
  options:
    | {
        value: string;
        label: string;
        disabled?: boolean;
      }[]
    | undefined;
};

const AppSelect = ({
  name,
  label,
  options,
  placeholder,
  disabled = false,
  isLoading = false,
  mode = undefined,
}: AppSelectProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Select
              {...field}
              style={{ width: "100%" }}
              options={options}
              size="large"
              mode={mode}
              placeholder={placeholder}
              loading={isLoading}
              disabled={disabled}
            />
            {error && <small style={{ color: "red" }}> {error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default AppSelect;
