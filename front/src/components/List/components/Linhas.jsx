import { MdDelete, MdEdit } from "react-icons/md";

function Linhas({ state, colunas = [], handleEdit, handleDelte }) {
  return (
    <tbody>
      {state.map((item) => (
        <tr>
          {colunas.map((col, index) => {
            const isPassWord = col.type === "password";

            const value = isPassWord ? "gerarRandonString" : item[col.name];

            return <td key={index}>{value}</td>;
          })}

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
        </tr>
      ))}
    </tbody>
  );
}

export default Linhas;
