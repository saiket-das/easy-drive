import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type FormConfigProps = {
  // defaultValues?: Record<string, string | number>;
  // resolver?: any;
  defaultValues?: Record<string, unknown>;
  resolver?: any;
};
type AppFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & FormConfigProps;

const AppForm = ({ onSubmit, children, defaultValues }: AppFormProps) => {
  const formConfig: FormConfigProps = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submit)}>{children}</form>
      </FormProvider>
    </div>
  );
};

export default AppForm;
