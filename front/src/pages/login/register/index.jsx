import { useState } from "react";
import Field from "../../../components/Fields";
import "./index.css";
import { validateForm } from "../../../hooks/helpers";
import toast from "react-hot-toast";
import apiR from "../../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { fieldsRegister } from "../../../consts";

function Register() {
  const [state, setState] = useState({ email: "", password: "", nome: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (validateForm(fieldsRegister, state)) {
      return;
    }

    const response = await apiR
      .post("/auth/register", state)
      .catch((err) => toast.error(err.response.data.message));

    if (response.data.id) {
      toast.success(response.data.message);
      navigate("/login");
    }
  };

  return (
    <div className="full-heigth form-register">
      <h1>Registro de usuario</h1>
      <div className="fields-area">
        {fieldsRegister.map(({ type, label, name }, index) => (
          <Field
            key={index}
            type={type}
            label={label}
            name={name}
            value={state?.[name]}
            setState={setState}
          />
        ))}
        <button onClick={handleSubmit}>Registrar</button>
        <Link to="/login">Voltar ao login</Link>
      </div>
    </div>
  );
}

export default Register;
