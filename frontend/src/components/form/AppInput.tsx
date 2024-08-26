import { Controller } from "react-hook-form";

type AppInputProps = {
  type: string;
  name: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
};

const AppInput = ({
  type,
  name,
  label,
  placeholder = `Enter your ${label?.toLocaleLowerCase()}`,
  disabled,
  required = true,
}: AppInputProps) => {
  // const { control } = useFormContext();

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        // control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input
              {...field}
              id={name}
              placeholder={placeholder}
              type={type}
              required={required}
              disabled={disabled}
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1  ring-gray-300  sm:text-sm sm:leading-6"
            />
            {error && <small style={{ color: "red" }}> {error.message}</small>}
          </div>
        )}
      />
    </div>
  );
};

export default AppInput;
