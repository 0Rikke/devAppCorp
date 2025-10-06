import { createContext, useCallback, useContext, useMemo } from "react";
import apiR from "../api/api";
import { useAuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const EventListContext = createContext();

const EventListProvider = ({ children, values }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleClick = useCallback(
    async (event) => {
      const usr = JSON.parse(user ?? {});

      if (!Object.keys(usr ?? {})?.length || !event?.id) return;

      console.log(event, usr);

      const response = await apiR
        .post("/protected/dashboard/volunteer", {
          event: event,
        })
        .catch((err) => console.log(err));

      console.log(response);
    },
    [user]
  );

  const editEvent = useCallback(
    (event) => {
      navigate(`/events/${event.id}`);
    },
    [navigate]
  );
  const deleteEvent = useCallback((event) => {
    apiR.delete(`/events/${event.id}`);
  }, []);

  const value = useMemo(
    () => ({
      editEvent,
      deleteEvent,
      handleClick,
      ...values,
    }),
    [deleteEvent, editEvent, handleClick, values]
  );

  return (
    <EventListContext.Provider value={value}>
      {children}
    </EventListContext.Provider>
  );
};

export default EventListProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useEventListContext = () => {
  const context = useContext(EventListContext);

  return context;
};
