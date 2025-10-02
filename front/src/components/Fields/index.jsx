import { memo, useCallback } from "react";

const Field = memo(({ type, value, name, label, setState }) => {
  const handleChange = useCallback(
    (e) => {
      setState((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    },
    [name, setState]
  );

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input onChange={handleChange} type={type} value={value} name={name} />
    </div>
  );
});

export default Field;
