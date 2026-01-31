import { createContext, FC, ReactNode, useContext } from "react";
import { useApiData } from "./useApiData";

type ApiData = ReturnType<typeof useApiData>;

// @ts-expect-error
const ApiContext = createContext<ApiData>({});

export const ApiProvider: FC<{ children: ReactNode | ReactNode[] }> = ({
  children,
}) => {
  const apiData = useApiData();

  return <ApiContext.Provider value={apiData}>{children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);
