import { Connect } from "@/assets/main-card/connect";
import { Button } from "./ui/Button";
import { Refresh } from "@/assets/main-card/refresh";
import { ViewAll } from "@/assets/main-card/view-all";

export const MainCard = () => {
  return (
    <div className="bg-white rounded-3xl p-10  w-full ">
      <p className=" text-neutral-400 text-lg font-normal ">Total Balance</p>
      <div className="flex items-center">
        <h1 className=" text-black text-[54px] font-medium ">153,000.65</h1>
        <p className="text-neutral-400 text-lg font-normal ">NGN</p>
      </div>
      <div className="flex gap-3">
        <Button>
          Connect <Connect />
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
