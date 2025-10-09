import { useRef, useState } from "react";
import useInitialData from "../../hooks/useInitialData";
import Loader from "../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { fieldsEvents } from "../../consts";
import Field from "../../components/Fields";
import { validateForm } from "../../hooks/helpers";
import apiR from "../../api/api";
import toast from "react-hot-toast";

function DashboardForm() {
  const { id } = useParams();
  const [initialLoading, setInitialLoading] = useState(false);
  const [state, setState] = useState();
  const serverData = useRef({});
  const navigate = useNavigate();

  useInitialData({
    avoidRequest: !id,
    route: "/protected/events",
    setInitialLoading,
    setState,
    id,
    serverData,
  });

  const handleSubmit = async () => {
    if (validateForm(fieldsEvents, state)) {
      return;
    }

    const response = await apiR
      .post("/protected/events", state)
      .catch((err) => {
        if (err?.response?.data?.message) {
          toast.error(err.response.data.message);
        }
      });

    if (response?.data?.id) {
      toast.success(response.data.message);
      navigate("/dashboard");
    }
  };
  return (
    <div className="dashboard-container">
      {initialLoading ? (
        <Loader />
      ) : (
        <div>
          <h2>Dashboard</h2>
          {fieldsEvents.map(({ type, label, name }, index) => (
            <Field
              id={id}
              key={index}
              type={type}
              label={label}
              name={name}
              value={state?.[name]}
              setState={setState}
              serverData={serverData}
              route="events"
            />
          ))}

          <button onClick={handleSubmit}>Criar Evento</button>
        </div>
      )}
    </div>
  );
}

export default DashboardForm;
