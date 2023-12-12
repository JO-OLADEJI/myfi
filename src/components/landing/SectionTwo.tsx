import { SupportedBanks } from "@/types/banks.type";
import { ArrowRight } from "lucide-react";

export const SectionTwo = () => {
  return (
    <div className="bg-primary  flex justify-around items-center p-10">
      <div className="flex flex-col gap-6">
        <p className="text-white text-[45px] font-semibold">
          Take control of your <br /> bank accounts
        </p>
        <p className="text-white text-[22px] font-medium">
          Take control of your bank accounts all in <br /> one place.
          Synchronize and keep records <br /> all at once.
        </p>
      </div>
      <div className="bg-white flex flex-col gap-5 rounded-lg h-max p-6">
        <p className="text-primary">Connect bank Account</p>
        <p>What bank do you want to connect?</p>
        <select className="select select-bordered w-full max-w-xs">
          {Object.entries(SupportedBanks).map(([key, v]) => (
            <option key={key}>{v}</option>
          ))}
        </select>
        <div className="w-full flex items-center justify-center ">
          <button className="btn btn-primary w-max rounded-full text-white">
            Next <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
