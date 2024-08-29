import { Form } from "antd";
import { ReactNode, useEffect } from "react";
import {
  FormProvider,
  SubmitHandler,
  FieldValues,
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

const AppForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: AppFormProps) => {
  // const formConfig: FormConfigProps = {};
  // // if (defaultValues) {
  // //   formConfig["defaultValues"] = defaultValues;
  // // }

  // const methods = useForm(formConfig);

  const methods = useForm({
    defaultValues,
    resolver,
  });

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default AppForm;
