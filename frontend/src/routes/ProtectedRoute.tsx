import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppLoading from "../components/ui/AppLoading";
import useAuth from "../hooks/useAuth";
import ROUTES from "../constants/routes";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";

interface RequireAuthProps {
  role: string;
  children: ReactNode;
}

const ProtectedRoute = ({ role, children }: RequireAuthProps) => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <AppLoading />;
  }

  if (!user) {
    return <Navigate to={ROUTES.SIGNIN} state={{ from: location }} replace />;
  }

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to={ROUTES.SIGNIN} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
