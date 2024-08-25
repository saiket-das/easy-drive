import { FieldValues, SubmitHandler } from "react-hook-form";
import AppForm from "../../components/form/AppForm";
import AppInput from "../../components/form/AppInput";

const Signin = () => {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };
  return (
    <AppForm onSubmit={onSubmit}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <AppInput type="text" name="email" label="Name" />
          <AppInput type="password" name="password" label="Password" />

          <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
            <button className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Signin
            </button>
          </div>

          {/* <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p> */}
        </div>
      </div>
    </AppForm>
  );
};

export default Signin;
