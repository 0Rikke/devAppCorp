import { useState } from "react";
import Loader from "../../components/Loader";
import useInitialData from "../../hooks/useInitialData";

const Home = () => {
  const [initialLoading, setInitialLoading] = useState(false);
  const [, setState] = useState(false);

  useInitialData({ route: "/public/home", setInitialLoading, setState});

  return <div>{initialLoading ? <Loader /> : <h1>Home</h1>}</div>;
};

export default Home;
