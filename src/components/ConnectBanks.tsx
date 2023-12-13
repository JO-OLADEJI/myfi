import React from "react";
import { Button } from "./ui/Button";
import { Plus } from "@/assets/banks-connected";
import { getBankLogo } from "@/lib/utils";
import useAppStore from "@/contexts/state";

export const ConnectBanks = () => {
  const connectedBanks = useAppStore((state) => state.connectedBanks);

  return (
    <div className="bg-white p-6 flex flex-col gap-3 rounded-3xl">
      <p className="text-neutral-400 text-lg font-normal">Connected Banks</p>
      <div className="border flex">
        <Button className="text-blue-700 text-base font-normal mr-5">
          <div className="p-4 rounded-full border-2 border-dashed border-blue-700">
            <Plus />
          </div>
        </Button>
        <div className="w-14 .flex .items-center .justify-center">
          {connectedBanks.map((bank, index) => (
            <div key={index} className="border">
              {getBankLogo(bank)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
