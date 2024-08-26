import { FieldValues, SubmitHandler } from "react-hook-form";
import AppForm from "../../components/form/AppForm";
import AppInput from "../../components/form/AppInput";
import { useAppDispatch } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AppRoutes from "../../utils/AppRoutes";

const Signup = () => {
  //   const defaultValues = {
  //     email: "ahan@gmail.com",
  //     password: "password123",
  //   };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    // {email: 'ahan@gmail.com', password: 'password123', firstname: 'Ahan', lastname: 'Bryan'}

    const signupData = {
      name: data.firstname + " " + data.lastname,
      user: "user",
      email: data.email,
      password: data.password,
    };
    console.log(signupData);

    // const toastId = toast.loading("Loggin in");
    // try {
    //   const res = await login(data).unwrap();
    //   // Decode token & set user info and user token in local storage
    //   const token = res.token;
    //   const user = verifyToken(token) as UserProps;
    //   dispatch(
    //     setUser({
    //       user: user,
    //       token,
    //     })
    //   );
    //   toast.success("Login Successfully!", { id: toastId, duration: 2000 });
    //   navigate("/dashboard");
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Something went wrong", { id: toastId, duration: 2000 });
    // }
  };
  return (
    <AppForm
      onSubmit={onSubmit}
      // defaultValues={defaultValues}
    >
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <div className="flex justify-between gap-4 sm:gap-6 md:gap-6 lg:gap-2">
            <AppInput type="text" name="firstname" label="First name" />
            <AppInput type="text" name="lastname" label="Last name" />
          </div>
          <AppInput type="text" name="email" label="Name" />
          <AppInput type="password" name="password" label="Password" />

          <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
            <button className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Signup
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
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
