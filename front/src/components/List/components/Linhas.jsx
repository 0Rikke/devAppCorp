import { MdDelete, MdEdit } from "react-icons/md";
import { useAuthContext } from "../../../context/AuthContext";

function Linhas({ state, colunas = [], handleEdit, handleDelte }) {
  const { user } = useAuthContext();
  
  return (
    <tbody>
      {state.map((item) => (
        <tr>
          {colunas.map((col, index) => {
            const isPassWord = col.type === "password";

            const value = isPassWord ? " . . . " : item[col.name];

            return <td key={index}>{value}</td>;
          })}

          {user.role === "admin" && (
            <td>
              <>
                <MdEdit
                  onClick={() => handleEdit?.(item)}
                  size={24}
                  color="#000000"
                />
                <MdDelete
                  onClick={() => handleDelte?.(item)}
                  size={24}
                  color="#000000"
                />
              </>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
}

export default Linhas;
