import { createBrowserRouter } from "react-router-dom";
import Routes from "../utils/Routes";
import Home from "../pages/Home/Home";
import MainLayout from "../components/layout/Layout";

const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <MainLayout />,
    children: [
      {
        path: Routes.HOME,
        element: <Home />,
      },
    ],
  },
]);

export default router;
