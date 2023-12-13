import { Plus } from "@/assets/banks-connected";
import useAppStore from "@/contexts/state";
import { getBankLogo } from "@/lib/utils";
import { Button } from "./ui/Button";

export const ConnectBanks = () => {
  const connectedBanks = useAppStore((state) => state.connectedBanks);

  return (
    <div className="bg-white p-6 flex flex-col gap-3 rounded-3xl">
      <p className="text-neutral-400 text-lg font-normal">Connected Banks</p>
      <div className=" flex">
        <Button className="text-blue-700 text-base font-normal mr-5">
          <div className="p-4 rounded-full border-2 border-dashed border-blue-700">
            <Plus />
          </div>
        </Button>
        <div className="w-14 flex items-center  gap-4">
          {connectedBanks.map((bank, index) => (
            <div
              key={index}
              className=" flex border p-2 rounded-full items-center justify-center min-w-[60px] min-h-[50px] h-full"
            >
              {getBankLogo(bank)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
