import { useEffect } from "react";
import api from "../../api/api";
import EventLists from "../../components/List/events";

const testList = [
  { name: "nascimento do bixo ruim", date: "26/02 - 2004" },
  { name: "protesto", date: "04/08 - 2025" },
];
const DashBoard = () => {
  useEffect(() => {
    async function get() {
      const response = await api
        .get("/protected/dashboard")
        .catch((err) => console.log("err", err));
      console.log(response);
      //request ok token mandando no caso aqui teria que trazer os eventos para se voluntariar acho
    }
    get();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <EventLists events={testList} />
    </div>
  );
};

export default DashBoard;
