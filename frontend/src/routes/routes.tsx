import { createBrowserRouter } from "react-router-dom";
import AppRoutes from "../utils/AppRoutes";
import Home from "../pages/Home/Home";
import MainLayout from "../components/layout/Layout";
import Cars from "../pages/Cars/Cars";
import Dashboard from "../pages/Dashboard/Dashboard";
import Signin from "../pages/Auth/Signin";
import CarDetails from "../pages/CarDetails/CarDetails";
import RequireAuth from "./RequireAuth";
import Signup from "../pages/Auth/Signup";
import NotFound from "../pages/404/NotFound";

const router = createBrowserRouter([
  {
    path: AppRoutes.HOME,
    element: <MainLayout />,
    children: [
      {
        path: AppRoutes.HOME,
        element: <Home />,
      },
      {
        path: AppRoutes.CARS,
        element: <Cars />,
      },
      {
        path: AppRoutes.CAR_DETAILS(":id"),
        element: <CarDetails />,
      },
      {
        path: AppRoutes.DASHBOARD,
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      // Authentication
      {
        path: AppRoutes.SIGNIN,
        element: <Signin />,
      },
      {
        path: AppRoutes.SIGNUP,
        element: <Signup />,
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
