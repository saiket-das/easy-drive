// import { Controller } from "react-hook-form";

// type AppInputProps = {
//   type: string;
//   name: string;
//   placeholder?: string;
//   label?: string;
//   required?: boolean;
//   disabled?: boolean;
// };

// const AppInput = ({
//   type,
//   name,
//   label,
//   placeholder = `Enter your ${label?.toLocaleLowerCase()}`,
//   disabled,
//   required = true,
// }: AppInputProps) => {
//   return (
//     <div>
//       {label && (
//         <label
//           htmlFor={name}
//           className="block text-sm font-medium leading-6 text-gray-900"
//         >
//           {label}
//         </label>
//       )}
//       <Controller
//         name={name}

//         render={({ field, fieldState: { error } }) => (
//           <div>
//             <input
//               {...field}
//               id={name}
//               placeholder={placeholder}
//               type={type}
//               required={required}
//               disabled={disabled}
//               className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1  ring-gray-300  sm:text-sm sm:leading-6"
//             />
//             {error && <small style={{ color: "red" }}> {error.message}</small>}
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// export default AppInput;

import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type AppInputProps = {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

const AppInput = ({
  type,
  name,
  label,
  placeholder = `Enter your ${name}`,
  disabled = false,
}: AppInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name}
              size="large"
              placeholder={placeholder}
              disabled={disabled}
            />
            {error && <small style={{ color: "red" }}> {error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default AppInput;
