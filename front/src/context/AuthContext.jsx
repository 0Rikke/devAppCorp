import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState();

  const logout = useCallback(() => {
    localStorage.clear("token");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && location.pathname != "/register") {
      navigate("/login");

      return
    }

    setUser(localStorage.getItem("user"))

  }, [location.pathname, navigate]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      logout,
    }),
    [logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context;
};
