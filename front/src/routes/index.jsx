import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import AuthProvider from "../context/AuthContext";
import { Toaster } from "react-hot-toast";
import DashBoard from "../pages/dashboard/index";
import DashBoardForm from "../pages/dashboard/form";
import Register from "../pages/login/register";
import NavBar from "../components/Nav";
import Volunteers from "../pages/volunteers";
import VolunteersForm from "../pages/volunteers/forms";

const IndexRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <NavBar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/dashboard" Component={DashBoard} />
          <Route path="/volunteers" Component={Volunteers} />
          <Route path="/volunteers/:id" Component={VolunteersForm} />
          <Route path="/events/:id" Component={DashBoardForm} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default IndexRoutes;
