import { Web5 } from "@web5/api/browser";
import { useState, useEffect, createContext, ReactNode } from "react";
import useAppStore from "./state";

interface Web5Context {
  web5: Web5 | undefined;
}

export const Web5Context = createContext<Web5Context>({} as Web5Context);

interface Web5ContextProviderProps {
  children: ReactNode;
}
const Web5ContextProvider = ({
  children,
}: Web5ContextProviderProps): JSX.Element => {
  const setDid = useAppStore((state) => state.setDid);
  const [web5, setWeb5] = useState<Web5>();

  useEffect(() => {
    const init = async (): Promise<void> => {
      const { web5, did } = await Web5.connect();
      setDid(did);
      setWeb5(() => web5);
    };
    init();
  }, []);

  return (
    <Web5Context.Provider value={{ web5 }}>{children}</Web5Context.Provider>
  );
};

export default Web5ContextProvider;
