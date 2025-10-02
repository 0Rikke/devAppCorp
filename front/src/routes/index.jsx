import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import AuthProvider from "../context/AuthContext";
import { Toaster } from "react-hot-toast";
import DashBoard from "../pages/dashboard";

const IndexRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/dashboard" Component={DashBoard} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default IndexRoutes;
