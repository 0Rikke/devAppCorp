import { useCallback, useMemo } from "react";
import Colunas from "./components/Colunas";
import Linhas from "./components/Linhas";
import "./index.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import apiR from "../../api/api";

function List({ state, setState, colunas, route }) {
  const navigate = useNavigate();

  const handleDelte = useCallback(
    async (item) => {
      const response = await apiR
        .delete(`/protected/${route}/${item.id}`)
        .catch((err) => console.log(err));

      if (response.data.message) {
        toast.success(response.data.message);
      }
      setState((prev) => prev.filter((itemFilter) => itemFilter.id != item.id));
    },
    [route, setState]
  );

  const handleEdit = useCallback(
    (item) => {
      navigate(`/${route}/${item.id}`);
    },
    [navigate, route]
  );

  const paramsLinhas = useMemo(
    () => ({ handleDelte, handleEdit, colunas, state }),
    [colunas, handleDelte, handleEdit, state]
  );
  return (
    <table>
      <Colunas colunas={colunas} />
      <Linhas {...paramsLinhas} />
    </table>
  );
}

export default List;
