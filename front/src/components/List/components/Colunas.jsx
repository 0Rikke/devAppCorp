import { useAuthContext } from "../../../context/AuthContext";

function Colunas({ colunas = [] }) {
  const { user } = useAuthContext();
  return (
    <thead>
      <tr>
        {colunas.map((col, index) => (
          <th key={index}>{col.name}</th>
        ))}
        {user.role === "admin" && <th> Edit </th>}
      </tr>
    </thead>
  );
}

export default Colunas;
