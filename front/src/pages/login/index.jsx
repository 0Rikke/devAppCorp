import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Field from "../../components/Fields";
import toast from "react-hot-toast";
import apiR from "../../api/api";
import useInitialData from "../../hooks/useInitialData";
import "./index.css";
import Loader from "../../components/Loader";
import EventLists from "../../components/List/events";
import { validateForm } from "../../hooks/helpers";
import { useAuthContext } from "../../context/AuthContext";
import EventListProvider from "../../context/EventListContext";
import { fieldsLogin } from "../../consts";

const Login = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const [events, setEvents] = useState({});
  const [initialLoading, setInitialLoading] = useState(false);
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  useInitialData({
    route: "/public/events",
    setInitialLoading,
    setState: setEvents,
  });

  const handleSubmit = async () => {
    if (validateForm(fieldsLogin, state)) {
      return;
    }

    const response = await apiR
      .post("/auth/login", state)
      .catch((err) => toast.error(err.response.data.message));

    if (response?.data?.token) {
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      setUser(response?.data?.user);

      navigate("/dashboard");
    }
  };

  return (
    <div className="flex login-container">
      <div className="split-screen">
        <div className="form">
          <div className="fields-area">
            {fieldsLogin.map(({ type, label, name }, index) => (
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
            <Link to="/register">register user</Link>
          </div>
        </div>
        <div className="events-login-container">
          {initialLoading ? (
            <Loader />
          ) : (
            <div className="full-heigth">
              <div className="title-events">
                <h2> Título do site para demostrar os eventos</h2>
              </div>
              <EventListProvider values={{ onlyShow: true }}>
                <EventLists events={events.events} />
              </EventListProvider>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
