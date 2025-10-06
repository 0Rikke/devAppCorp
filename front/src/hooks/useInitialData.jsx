import { useCallback, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import apiR from "../api/api";

function useInitialData({
  id,
  route,
  setInitialLoading,
  setState,
  avoidRequest = false,
  serverData = {},
}) {
  const { logout } = useAuthContext();

  const handleError = useCallback(
    (err) => {
      console.log(err);

      if ([401, 403].includes(err?.response?.status)) {
        logout();
      }

      return { status: "error" };
    },
    [logout]
  );

  const setInitialData = useCallback(
    (data) => {
      setState(data.data);
      serverData.current = data.data; 
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setState]
  );

  const getData = useCallback(async () => {
    setInitialLoading(true);
    if (avoidRequest) return;

    const newRoute = id ? route + `/${id}` : route;

    const response = await apiR.get(newRoute).catch((err) => handleError(err));

    if (response?.status == "error") {
      setInitialLoading(false);
      return;
    }
    setInitialData(response.data);
    setTimeout(() => {
      setInitialLoading(false);
    }, 500);
  }, [avoidRequest, handleError, id, route, setInitialData, setInitialLoading]);

  useEffect(() => {
    getData();
  }, [getData]);
}

export default useInitialData;
