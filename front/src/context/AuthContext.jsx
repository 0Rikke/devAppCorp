import { createContext, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token: ", token);

    if (!token) {
      console.log("cade o navigate");
      navigate("/login");
    }
  }, [navigate]);

  const value = useMemo(
    () => ({
      user,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
