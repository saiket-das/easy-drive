import { useEffect, useState } from "react";
import { useCurrentToken, UserProps } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import AppRoutes from "../utils/AppRoutes";

interface UseAuthResult {
  user: UserProps | null;
  isLoading: boolean;
}

const useAuth = (): UseAuthResult => {
  const token = useAppSelector(useCurrentToken);
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      if (token) {
        try {
          const verifiedUser = verifyToken(token) as UserProps;
          setUser(verifiedUser);
        } catch (error) {
          console.error("Token verification failed", error);
          navigate(AppRoutes.SIGNIN, { replace: true });
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    authenticateUser();
    setIsLoading(false);
  }, [token, navigate]);

  return {
    user,
    isLoading,
  };
};

export default useAuth;

// const token = useAppSelector(useCurrentToken);
// let user;
// if (token) {
//   user = verifyToken(token) as UserProps;
// }
