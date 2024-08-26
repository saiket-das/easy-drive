import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppLoading from "../components/ui/AppLoading";
import useAuth from "../hooks/useAuth";
import AppRoutes from "../utils/AppRoutes";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <AppLoading />;
  }

  if (!user) {
    return (
      <Navigate to={AppRoutes.SIGNIN} state={{ from: location }} replace />
    );
  }

  return children;
};

export default RequireAuth;
