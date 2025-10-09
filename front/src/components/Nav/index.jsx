import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import {
  MdCalendarMonth,
  MdLogout,
  MdPeople,
  MdVolunteerActivism,
} from "react-icons/md";
import { useMemo } from "react";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthContext();

  const showNav = useMemo(
    () => !["/login", "/register"].includes(location.pathname),
    [location.pathname]
  );

  return showNav ? (
    <div className="flex-between margin-nav">
      <div className="flex-center" onClick={() => navigate("/dashboard")}>
        <MdCalendarMonth size={40} color="black" />
        Eventos
      </div>

      <div className="flex-center" onClick={() => navigate("/volunteers")}>
        <MdVolunteerActivism size={40} color="black" />
        Volutarios
      </div>

      <div className="flex-between gap">
        <MdPeople
          size={40}
          color="black"
          onClick={() =>
            navigate(`/volunteers/${user.id}`, {
              state: { title: "Registro do Usuário" },
            })
          }
        />
        <MdLogout size={40} color="black" onClick={() => logout()} />
      </div>
    </div>
  ) : null;
}

export default NavBar;
