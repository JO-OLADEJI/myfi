import { Download } from "@/assets/analytics/Download";
import { Button } from "../ui/Button";
import Select from "../ui/Select";

export const SummaryCard = () => {
  return (
    <div>
      <div className="flex">
        <p className="text-black text-[22px] font-bold ">Analytics</p>
        <Select items={["Alll Banks"]} />
        <Select items={["Last 3- Days"]} />
        <Button>
          <Download />
          Download Receipt
        </Button>
      </div>
    </div>
  );
};
