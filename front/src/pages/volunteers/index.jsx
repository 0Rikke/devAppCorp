import { useState } from "react";
import useInitialData from "../../hooks/useInitialData";
import Loader from "../../components/Loader";

function Volunteers() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [state, setState] = useState();

  useInitialData({
    route: "/protected/volunteers",
    setInitialLoading,
    setState,
  });

  return (
    <div className="dashboard-container">
      {initialLoading ? <Loader /> : <h2>Voluntarios</h2>}
    </div>
  );
}

export default Volunteers;
