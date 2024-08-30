import { FieldValues, SubmitHandler } from "react-hook-form";
import AppForm from "../../components/form/AppForm";
import AppInput from "../../components/form/AppInput";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ROUTES from "../../constants/routes";
import { useSignupMutation } from "../../redux/features/auth/authApi";
import { Button, Col, Row } from "antd";
import { ErrorProps } from "../../types";

const Signup = () => {
  const [signup, { isLoading: signupLoading }] = useSignupMutation();
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
        navigate(ROUTES.SIGNIN);
      }
    } catch (error) {
      const err = error as ErrorProps;
      toast.error(err.data.message, {
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
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Row gutter={[12, 0]}>
            <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
              <AppInput type="text" name="firstName" label="First name" />
            </Col>
            <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
              <AppInput type="text" name="lastName" label="Last name" />
            </Col>
          </Row>
          <AppInput type="text" name="email" label="Email" />
          <AppInput type="password" name="password" label="Password" />

          <Button
            htmlType="submit"
            style={{ width: "100%" }}
            size="large"
            loading={signupLoading}
            iconPosition="start"
            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {signupLoading ? "Loading..." : "Signup"}
          </Button>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{" "}
            <Link
              to={ROUTES.SIGNIN}
              className="font-semibold leading-6 text-primary hover:text-primary-600"
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
