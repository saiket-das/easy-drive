import { createBrowserRouter } from "react-router-dom";
import ROUTES from "../constants/routes";
import Home from "../pages/Home/Home";
import MainLayout from "../components/layout/Layout";
import Cars from "../pages/Cars/Cars";
import Dashboard from "../pages/Dashboard/Dashboard";
import Signin from "../pages/Auth/Signin";
import CarDetails from "../pages/Cars/CarDetails/CarDetails";

import Signup from "../pages/Auth/Signup";
import NotFound from "../pages/404/NotFound";
import RentCar from "../pages/Cars/RentCar/RentCar";
import ProtectedRoute from "./ProtectedRoute";
import { ROLE } from "../constants/roles";
import App from "../App";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.CARS,

        element: (
          <ProtectedRoute role={ROLE.user}>
            <Cars />,
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.CAR_DETAILS(":id"),
        element: (
          <ProtectedRoute role={ROLE.user}>
            <CarDetails />,
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.RENT_CAR(":id"),
        element: (
          <ProtectedRoute role={ROLE.user}>
            <RentCar />
          </ProtectedRoute>
        ),
      },
      {
        path: "/",
        element: <App />,
      },
    ],
  },
  // Admin routes
  {
    path: ROUTES.ADMIN,
    element: (
      <ProtectedRoute role={ROLE.admin}>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },

  // User routes
  {
    path: ROUTES.USER,
    element: (
      <ProtectedRoute role={ROLE.user}>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths),
  },

  // Authentication
  {
    path: ROUTES.SIGNIN,
    element: <Signin />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <Signup />,
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
