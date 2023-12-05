import { Connect } from "@/assets/main-card/connect";
import { Button } from "./ui/Button";
import { Refresh } from "@/assets/main-card/refresh";
import { ViewAll } from "@/assets/main-card/view-all";
import useAppStore from "@/contexts/state";
import config from "@/config.json";

export const MainCard = () => {
  const did = useAppStore((state) => state.did);
  const isProtocolConfigured = useAppStore(
    (state) => state.isProtocolConfigured
  );
  const totalBalance = useAppStore((state) => state.totalBalance);
  const isDidConnected = useAppStore((state) => state.isDidConnected);
  const toggleDidConnection = useAppStore((state) => state.toggleDidConnection);

  const handleConnectDid = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    toggleDidConnection();
  };

  const connectBtnState = () => {
    if (isDidConnected) {
      if (did.length > 0) {
        return isProtocolConfigured
          ? did.substring(0, 14) + " . . ."
          : "configuring . . .";
      } else {
        return "loading . . .";
      }
    } else {
      return (
        <>
          Connect DID <Connect />
        </>
      );
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
        <Button onClick={handleConnectDid}>{connectBtnState()}</Button>
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
