import { Connect } from "@/assets/main-card/connect";
import { Button } from "./ui/Button";
import { Refresh } from "@/assets/main-card/refresh";
import { ViewAll } from "@/assets/main-card/view-all";
import useAppStore from "@/contexts/state";
import config from "@/config.json";
import { useInstallProtocol } from "@/web5/hooks";

export const MainCard = () => {
  const did = useAppStore((state) => state.did);
  const totalBalance = useAppStore((state) => state.totalBalance);
  const isDidConnected = useAppStore((state) => state.isDidConnected);
  const toggleDidConnection = useAppStore((state) => state.toggleDidConnection);
  const { configureProtocol, installingProtocol, successInstallingProtocol } =
    useInstallProtocol();

  const handleConnectDid = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    toggleDidConnection();
    if (!isDidConnected) {
      configureProtocol();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-10  w-full ">
      <p className=" text-neutral-400 text-lg font-normal ">Total Balance</p>
      <div className="flex items-end gap-7 mb-5">
        <h1 className=" text-black text-[52px] font-medium">
          {new Intl.NumberFormat().format(totalBalance)}
        </h1>
        <p className="text-neutral-400 text-lg font-normal mb-4">
          {config.currency}
        </p>
      </div>
      <div className="flex gap-3">
        <Button onClick={handleConnectDid}>
          {isDidConnected || successInstallingProtocol ? (
            did === "" ? (
              "loading . . ."
            ) : (
              did.substring(0, 14) + " . . ."
            )
          ) : installingProtocol ? (
            "loading . . ."
          ) : (
            <>
              Connect DID <Connect />
            </>
          )}
        </Button>
        <Button variaant="outline">
          View All <ViewAll />
        </Button>
        <Button variaant="outline">
          Refresh <Refresh />
        </Button>
      </div>
    </div>
  );
};
