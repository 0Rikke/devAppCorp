import { useState } from "react";
import Field from "../../components/Fields";
import toast from "react-hot-toast";
import apiR from "../../api/api"
import { useNavigate } from "react-router-dom";
const fields = [
  { name: "email", label: "Login", type: "text" },
  { name: "password", label: "Senha", type: "password" },
];
const Login = () => {
  const [state, setState] = useState({});
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    const response = await apiR
      .post("/auth/login", state)
      .catch((err) => toast.error(err.response.data.message));

    if (response?.data?.token) {
      localStorage.setItem("token", response?.data?.token)
      navigate("/dashboard")
    }
  };

  return (
    <div>
      {/* <form onSubmit={(e) => e.preventDefault()}> */}
        {fields.map(({ type, label, name }, index) => (
          <Field
            key={index}
            type={type}
            label={label}
            name={name}
            value={state?.[name]}
            setState={setState}
          />
        ))}
        <button onClick={handleSubmit}>Login</button>
      {/* </form> */}
    </div>
  );
};

export default Login;
