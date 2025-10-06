import { useMemo, useState } from "react";
import EventLists from "../../components/List/events";
import useInitialData from "../../hooks/useInitialData";
import Loader from "../../components/Loader";
import EventListProvider from "../../context/EventListContext";
import "./index.css";

const DashBoard = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [state, setState] = useState();

  useInitialData({
    route: "/protected/dashboard",
    setInitialLoading,
    setState,
  });

  const value = useMemo(
    () => ({
      onClick: () => {},
    }),
    []
  );

  return (
    <div className="dashboard-container">
      {initialLoading ? (
        <Loader />
      ) : (
        <EventListProvider values={value}>
          <h2>Dashboard</h2>
          <EventLists events={state.events} />
        </EventListProvider>
      )}
    </div>
  );
};

export default DashBoard;
