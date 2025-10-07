import { createContext, useCallback, useContext, useMemo } from "react";
import apiR from "../api/api";
import { useAuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EventListContext = createContext();

const EventListProvider = ({ children, values }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { onDelete } = values;

  const handleClick = useCallback(
    async (event) => {
      if (!Object.keys(user ?? {})?.length || !event?.id) return;

      const response = await apiR
        .post("/protected/dashboard/volunteer", {
          event: event,
        })
        .catch((err) => {
          if (err?.response?.data?.message) {
            toast.error(err.response.data.message);
          }
        });

      if (response?.data?.message) {
        if (response.data.status === "success") {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    },
    [user]
  );

  const editEvent = useCallback(
    (event) => {
      navigate(`/events/${event.id}`);
    },
    [navigate]
  );
  const deleteEvent = useCallback(
    async (event) => {
      const response = await apiR
        .delete(`/protected/events/${event.id}`)
        .catch((err) => console.log(err));

      if (response.data.message) {
        toast.success(response.data.message);
      }

      onDelete?.(event.id);
    },
    [onDelete]
  );

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
