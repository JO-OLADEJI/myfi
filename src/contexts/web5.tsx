import { Web5 } from "@web5/api/browser";
import { useState, useEffect, createContext, ReactNode } from "react";
import useAppStore from "./state";
import { useConfigureProtocol } from "@/web5/hooks";

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
  const setIsProtocolConfigured = useAppStore(
    (state) => state.setIsProtocolConfigured
  );
  const [web5, setWeb5] = useState<Web5>();
  const { configureProtocol, isConfigured } = useConfigureProtocol();

  useEffect(() => {
    const init = async (): Promise<void> => {
      const { web5, did } = await Web5.connect();
      await configureProtocol(web5);
      setDid(did);
      setWeb5(() => web5);
    };
    init();
  }, []);

  useEffect(() => {
    setIsProtocolConfigured(isConfigured);
  }, [isConfigured]);

  return (
    <Web5Context.Provider value={{ web5 }}>{children}</Web5Context.Provider>
  );
};

export default Web5ContextProvider;
