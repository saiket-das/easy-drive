import { FieldValues, SubmitHandler } from "react-hook-form";
import AppForm from "../../components/form/AppForm";
import AppInput from "../../components/form/AppInput";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AppRoutes from "../../utils/AppRoutes";
import { useSignupMutation } from "../../redux/features/auth/authApi";

const Signup = () => {
  //   const defaultValues = {
  //     email: "ahan@gmail.com",
  //     password: "password123",
  //   };

  const [signup] = useSignupMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const signupData = {
      name: data.firstname + " " + data.lastname,
      role: "user",
      email: data.email,
      password: data.password,
    };
    const toastId = "Signup";
    try {
      const res = await signup(signupData).unwrap();

      if (res.error) {
        toast.error(res.data.message, { id: toastId });
      } else {
        toast.success("Account Created Successfully! 🎉", {
          description: "Please log in to access your dashboard.",
          id: toastId,
          duration: 2000,
        });
        navigate(AppRoutes.SIGNIN);
      }
    } catch (error) {
      toast.error(error?.data?.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <AppForm
      onSubmit={onSubmit}
      // defaultValues={defaultValues}
    >
      <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <div className="flex justify-between gap-4 sm:gap-4 md:gap-4 lg:gap-4">
            <AppInput type="text" name="firstname" label="First name" />
            <AppInput type="text" name="lastname" label="Last name" />
          </div>
          <AppInput type="text" name="email" label="Email" />
          <AppInput type="password" name="password" label="Password" />

          <div className="flex items-center flex-col sm:flex-row justify-center gap-3">
            <button className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Signup
            </button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to={AppRoutes.SIGNIN}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Signin
            </Link>
          </p>
        </div>
      </div>
    </AppForm>
  );
};

export default Signup;
