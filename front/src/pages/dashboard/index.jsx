import { useState } from "react";
import EventLists from "../../components/List/events";
import useInitialData from "../../hooks/useInitialData";
import Loader from "../../components/Loader";

const testList = [
  { name: "nascimento do bixo ruim", date: "26/02 - 2004" },
  { name: "protesto", date: "04/08 - 2025" },
];
const DashBoard = () => {
  const [initialLoading, setInitialLoading] = useState(false);

  useInitialData({ route: "/protected/dashboard", setInitialLoading });

  return (
    <div>
      {initialLoading ? (
        <Loader />
      ) : (
        <>
          <h2>Dashboard</h2>
          <EventLists events={testList} />
        </>
      )}
    </div>
  );
};

export default DashBoard;
