import { Button } from "./ui/Button";
import { Uba, Kuda } from "@/assets/banks-logo";
import { Plus } from "@/assets/banks-connected";

export const ConnectBanks = () => {
  return (
    <div className="bg-white p-10  flex flex-col gap-3 rounded-3xl ">
      <p className=" text-neutral-400 text-lg font-normal ">
        All Banks Connected
      </p>
      <div className="flex gap-2">
        <div className=" flex flex-col items-center gap-2">
          <div className=" flex items-center justify-center  p-7 rounded-full border border-dashed border-blue-700">
            <Plus />
          </div>
          <Button className="text-blue-700 text-base font-normal ">Add</Button>
        </div>
        {connectedBanks.map((bank, index) => (
          <div
            className="flex   flex-col gap-2 w-max items-center "
            key={index}
          >
            {getLogo(bank)}
            <p className="text-neutral-400 text-base font-normal font-['Inter']">
              {bank}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const getLogo = (bank: string) => {
  switch (bank) {
    case "Kuda":
      return <Kuda />;
    case "Uba":
      return <Uba />;

    default:
      return <Uba />;
  }
};

const connectedBanks = ["Kuda", "Uba"];
