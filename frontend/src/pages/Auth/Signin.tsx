import { FieldValues, SubmitHandler } from "react-hook-form";
import AppForm from "../../components/form/AppForm";
import AppInput from "../../components/form/AppInput";
import { useSigninMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setUser, UserProps } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import ROUTES from "../../constants/routes";
import { Button } from "antd";
import { ErrorProps } from "../../types";

const Signin = () => {
  const defaultValues = {
    email: "admin@gmail.com",
    password: "password123",
  };

  const [signin, { isLoading: signinLoading }] = useSigninMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || ROUTES.HOME;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "signin";
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
      if (from.includes("admin") || from.includes("user")) {
        // console.log("Come from:", from);
        // console.log("Going next:", `/${user.role}/${ROUTES.DASHBOARD}`);
        navigate(`/${user.role}/${ROUTES.DASHBOARD}`);
      } else {
        navigate(from);
      }
    } catch (error) {
      const err = error as ErrorProps;
      toast.error(err.data.message, { id: toastId, duration: 2000 });
    }
  };
  return (
    <AppForm onSubmit={onSubmit} defaultValues={defaultValues}>
      <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <AppInput type="text" name="email" label="Email" />
          <AppInput type="password" name="password" label="Password" />

          <Button
            htmlType="submit"
            style={{ width: "100%" }}
            size="large"
            loading={signinLoading}
            iconPosition="start"
            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {signinLoading ? "Loading..." : "Signin"}
          </Button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to={ROUTES.SIGNUP}
              className="font-semibold leading-6 text-primary hover:text-primary-600"
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
