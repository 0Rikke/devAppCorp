import { useCallback, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import apiR from "../api/api";

function useInitialData({ route, setInitialLoading }) {
  const { logout } = useAuthContext();

  const handleError = useCallback(
    (err) => {
      if ([401, 500].includes(err.response.status)) {
        logout();
      }
      console.log();
    },
    [logout]
  );

  const getData = useCallback(async () => {
    setInitialLoading(true);

    const response = await apiR.get(route).catch((err) => handleError(err));
    console.log(response.data);

    setTimeout(() => {
      setInitialLoading(false);
    }, 500);
  }, [handleError, route, setInitialLoading]);

  useEffect(() => {
    getData();
  }, [getData]);
}

export default useInitialData;
