import { memo } from "react";

const Item = memo(({ event }) => (
  <div style={{border:"solid 1px black"}}>
    <div>Nome: {event?.name}</div>
    <div>Data: {event?.date}</div>
  </div>
));

const EventLists = ({
  events = [],
}) => {
  return (
    <>
      {events.map((item, index) => (
        <Item key={index} event={item} />
      ))}
    </>
  );
};

export default EventLists;
