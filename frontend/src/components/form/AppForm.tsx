import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type AppFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
};

const AppForm = ({ onSubmit, children }: AppFormProps) => {
  const methods = useForm();

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
      </FormProvider>
    </div>
  );
};

export default AppForm;
