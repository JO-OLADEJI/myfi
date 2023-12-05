import { useContext, useState, useCallback } from "react";
import { Web5Context } from "@/contexts/web5";
import protocolDefinition from "../protocol.json";
import useAppStore from "@/contexts/state";

interface InstallStatus {
  installingProtocol: boolean;
  successInstallingProtocol: boolean;
  configureProtocol: () => Promise<void>;
}

const useInstallProtocol = (): InstallStatus => {
  const { web5 } = useContext(Web5Context);
  const did = useAppStore((state) => state.did);
  const [success, setSuccess] = useState<boolean>(false);
  const [installing, setInstalling] = useState<boolean>(false);

  const configureProtocol = useCallback(async () => {
    if (web5) {
      setInstalling(true);

      try {
        const { protocol, status } = await web5.dwn.protocols.configure({
          message: {
            definition: protocolDefinition,
          },
        });

        //sends protocol to remote DWNs immediately (vs waiting for sync)
        await protocol?.send(did);
        setInstalling(false);
        setSuccess(status.code >= 200 && status.code < 300 ? true : false);
      } catch (error) {
        setInstalling(false);
        setSuccess(false);
      }
    }
  }, [web5]);

  return {
    successInstallingProtocol: success,
    installingProtocol: installing,
    configureProtocol,
  };
};

export default useInstallProtocol;
