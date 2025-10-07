import { memo, useMemo } from "react";
import { useEventListContext } from "../../context/EventListContext";
import { MdEdit, MdDelete } from "react-icons/md";
import { useLocation } from "react-router-dom";
import "./index.css";
import { useAuthContext } from "../../context/AuthContext";

const Item = memo(({ event }) => {
  const location = useLocation();
  const eventCtx = useEventListContext();
  const { user } = useAuthContext();


  const isLogin = useMemo(
    () => ["/login", "/register"].includes(location.pathname),
    [location.pathname]
  );

  return (
    <div className="events">
      <div className="flex-between margin-5">
        <div>
          <h3>Nome: {event?.name}</h3>
        </div>
        <div>
          {!isLogin && user.role === "admin" && (
            <>
              <MdEdit
                onClick={() => eventCtx.editEvent(event)}
                size={24}
                color="#000000"
              />
              <MdDelete
                onClick={() => eventCtx.deleteEvent(event)}
                size={24}
                color="#000000"
              />
            </>
          )}
        </div>
      </div>
      <div className="event-image flex">
        <img src="../../../public/calendar.png" />
      </div>
      <p className="flex-center">{event?.description}</p>
      <div className="flex-between margin-5">
        {!eventCtx?.onlyShow && (
          <button onClick={() => eventCtx?.handleClick(event)}>
            Voluntariar
          </button>
        )}
        <span>Data: {event?.date?.split("T")[0]}</span>
      </div>
    </div>
  );
});

const EventLists = ({ events = [] }) => {
  return (
    <div className="event-container">
      {events.map((item, index) => (
        <Item key={index} event={item} />
      ))}
    </div>
  );
};

export default EventLists;
