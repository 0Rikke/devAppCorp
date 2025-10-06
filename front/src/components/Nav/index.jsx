import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { MdCalendarMonth, MdPeople, MdVolunteerActivism } from "react-icons/md";
import { useMemo } from "react";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAuthContext();

  const showNav = useMemo(
    () => !["/login", "/register"].includes(location.pathname),
    [location.pathname]
  );

  console.log(user);
  return showNav ? (
    <div className="flex-between margin-nav">
      <div className="flex-center" onClick={() => navigate("/dashboard")}>
        <MdCalendarMonth size={40} color="black" />
        Eventos
      </div>

      {user && user.role === "admin" && (
        <div className="flex-center" onClick={() => navigate("/volunteers")}>
          <MdVolunteerActivism size={40} color="black" />
          Volutarios
        </div>
      )}

      <MdPeople size={40} color="black" onClick={() => navigate("/user")} />
    </div>
  ) : null;
}

export default NavBar;
