import { useState, useCallback } from "react";
import protocolDefinition from "@/protocol1.json";
import useAppStore from "@/contexts/state";
import { Web5 } from "@web5/api";

interface InstallStatus {
  isConfigured: boolean;
  configureProtocol: (web5: Web5) => Promise<void>;
}

const useConfigureProtocol = (): InstallStatus => {
  const did = useAppStore((state) => state.did);
  const [isConfigured, setIsConfigured] = useState<boolean>(false);

  const configureProtocol = useCallback(
    async (web5: Web5) => {
      try {
        // query remote protocol
        console.log("Querying remote protocol...");
        const { protocols: remoteProtocols, status: remoteProtocolStatus } =
          await web5.dwn.protocols.query({
            from: did,
            message: {
              filter: {
                protocol: protocolDefinition.protocol,
              },
            },
          });

        // if protocol not found, install protocol on remote DWNs
        if (remoteProtocolStatus.code !== 200 || remoteProtocols.length === 0) {
          console.log("Remote protocol not found...");
          console.log("Configuring remote protocol...");
          setIsConfigured(false);
          const { protocol, status } = await web5.dwn.protocols.configure({
            message: {
              definition: protocolDefinition,
            },
          });
          await protocol?.send(did);

          setIsConfigured(
            status.code >= 200 && status.code < 300 ? true : false
          );
          status.code >= 200 && status.code < 300
            ? console.log("Remote protocol installed successfully...")
            : console.error("Error configuring remote protocol...");
        } else {
          console.log("Remote protocol installed successfully...");
          setIsConfigured(true);
        }
      } catch (error) {
        setIsConfigured(false);
      }
    },
    [did]
  );

  return {
    isConfigured,
    configureProtocol,
  };
};

export default useConfigureProtocol;
