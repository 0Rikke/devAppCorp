import { useState } from "react";
import useInitialData from "../../hooks/useInitialData";
import Loader from "../../components/Loader";
import List from "../../components/List";
import { fieldsRegister } from "../../consts";

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
      {initialLoading ? (
        <Loader />
      ) : (
        <div>
          <h2>Voluntarios</h2>
          <List
            route="volunteers"
            state={state}
            setState={setState}
            colunas={fieldsRegister}
          />
        </div>
      )}
    </div>
  );
}

export default Volunteers;
