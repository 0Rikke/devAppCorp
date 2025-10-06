import { useRef, useState } from "react";
import useInitialData from "../../hooks/useInitialData";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";
import { fieldsEvents } from "../../consts";
import Field from "../../components/Fields";

function DashboardForm() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [state, setState] = useState();
  const serverData = useRef({});
  const { id } = useParams();

  useInitialData({
    avoidRequest: !id,
    route: "/protected/events",
    setInitialLoading,
    setState,
    id,
    serverData,
  });

  // console.log(state);

  return (
    <div className="dashboard-container">
      {initialLoading ? (
        <Loader />
      ) : (
        <div>
          <h2>Dashboard</h2>
          <h2>Dashboard</h2>
          {fieldsEvents.map(({ type, label, name }, index) => (
            <Field
              key={index}
              type={type}
              label={label}
              name={name}
              value={state?.[name]}
              setState={setState}
              serverData={serverData}
              id={id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardForm;
