import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Controller } from "react-hook-form";

type AppTextFieldProps = {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

const AppTextField = ({
  name,
  label,
  placeholder = `Enter your ${name}`,
  disabled = false,
}: AppTextFieldProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <TextArea
              {...field}
              id={name}
              size="large"
              placeholder={placeholder}
              disabled={disabled}
              style={{ height: "100px" }}
            />
            {error && <small style={{ color: "red" }}> {error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default AppTextField;
