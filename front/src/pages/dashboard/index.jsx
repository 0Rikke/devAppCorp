import { useMemo, useState } from "react";
import EventLists from "../../components/List/events";
import useInitialData from "../../hooks/useInitialData";
import Loader from "../../components/Loader";
import EventListProvider from "../../context/EventListContext";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const DashBoard = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [state, setState] = useState();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useInitialData({
    route: "/protected/dashboard",
    setInitialLoading,
    setState,
  });

  const value = useMemo(
    () => ({
      onDelete: (id) => {
        setState((prev) => ({
          ...prev,
          events: prev.events.filter((item) => item.id !== id),
        }));
      },
    }),
    []
  );

  const createEvent = () => navigate("/events");

  return (
    <div className="dashboard-container">
      {initialLoading ? (
        <Loader />
      ) : (
        <EventListProvider values={value}>
          <h2>Dashboard</h2>
          <EventLists events={state.events} />
          {user.role === "admin" && (
            <button className="add-event" onClick={createEvent}>
              Adicionar Evento
            </button>
          )}
        </EventListProvider>
      )}
    </div>
  );
};

export default DashBoard;
