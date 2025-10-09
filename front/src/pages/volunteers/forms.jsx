import { useRef, useState } from "react";
import "./index.css";
import Field from "../../components/Fields";
import { fieldsRegister } from "../../consts";
import useInitialData from "../../hooks/useInitialData";
import Loader from "../../components/Loader";
import { useLocation, useParams } from "react-router-dom";

function VolunteersForm() {
  const location = useLocation();
  const [state, setState] = useState({ email: "", password: "", nome: "" });
  const [initialLoading, setInitialLoading] = useState(true);
  const serverData = useRef();
  const { id } = useParams();

  useInitialData({
    id,
    route: "/protected/volunteers",
    setInitialLoading,
    setState,
    serverData,
  });

  console.log();

  return initialLoading ? (
    <Loader />
  ) : (
    <div className="full-heigth form-register">
      <h1>
        {location?.state?.title ? location.state.title : "Registro do voluntário"}
      </h1>
      <div className="fields-area">
        {fieldsRegister.map(({ type, label, name, disable }, index) => (
          <Field
            id={id}
            key={index}
            type={type}
            label={label}
            name={name}
            value={state?.[name]}
            setState={setState}
            route="volunteers"
            serverData={serverData}
            disable={disable}
          />
        ))}
      </div>
    </div>
  );
}

export default VolunteersForm;
