import { memo, useCallback, useMemo } from "react";
import "./index.css";
import apiR from "../../api/api";
import toast from "react-hot-toast";

const Field = memo(({ serverData, type, value, name, label, setState, id }) => {
  const handleChange = useCallback(
    (e) => {
      setState((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    },
    [name, setState]
  );

  const val = useMemo(() => {
    if (type === "date") {
      return value.split("T")[0];
    }
    return value;
  }, [type, value]);

  const handleUpdate = useCallback(async () => {
    console.log(serverData.current, name, value);

    if (serverData.current[name] == value) return;

    const response = await apiR
      .post(`/protected/events/${id}`, { [name]: value })
      .catch((err) => console.log(err));

      console.log(response.data);
      
      if (response.data.status === "success") {
        toast.success(response.data.message);
        serverData.current[name] = value;
    }
  }, [id, name, serverData, value]);

  return (
    <div className="field">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        className="input"
        type={type}
        value={val}
        name={name}
        onChange={handleChange}
        onBlur={handleUpdate}
      />
    </div>
  );
});

export default Field;
