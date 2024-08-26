import { FieldValues, SubmitHandler } from "react-hook-form";
import AppForm from "../../components/form/AppForm";
import AppInput from "../../components/form/AppInput";
import { useSigninMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setUser, UserProps } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import AppRoutes from "../../utils/AppRoutes";

const Signin = () => {
  const defaultValues = {
    email: "admin@gmail.com",
    password: "password123",
  };

  const [signin] = useSigninMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const toastId = toast.loading("Loggin in");
    try {
      const res = await signin(data).unwrap();
      // Decode token & set user info and user token in local storage
      const token = res.token;
      const user = verifyToken(token) as UserProps;
      dispatch(
        setUser({
          user: user,
          token,
        })
      );
      toast.success("Login Successfully!", { id: toastId, duration: 2000 });
      navigate(AppRoutes.DASHBOARD, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <AppForm onSubmit={onSubmit} defaultValues={defaultValues}>
      <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <AppInput type="text" name="email" label="Email" />
          <AppInput type="password" name="password" label="Password" />

          <div className="flex items-center flex-col sm:flex-row justify-center gap-3">
            <button className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Signin
            </button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to={AppRoutes.SIGNUP}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </AppForm>
  );
};

export default Signin;
