import { Web5 } from "@web5/api/browser";
import { useState, useEffect, createContext, ReactNode } from "react";

interface Web5Context {
  web5: Web5 | undefined;
  did: string;
}

export const Web5Context = createContext<Web5Context>({} as Web5Context);

interface Web5ContextProviderProps {
  children: ReactNode;
}
const Web5ContextProvider = ({
  children,
}: Web5ContextProviderProps): JSX.Element => {
  const [web5, setWeb5] = useState<Web5>();
  const [did, setDid] = useState<string>("");

  useEffect(() => {
    const init = async (): Promise<void> => {
      const { web5, did } = await Web5.connect();
      setDid(() => did);
      setWeb5(() => web5);
    };
    init();
  }, []);

  return (
    <Web5Context.Provider value={{ web5, did }}>
      {children}
    </Web5Context.Provider>
  );
};

export default Web5ContextProvider;
