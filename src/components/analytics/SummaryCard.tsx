import { Download } from "@/assets/analytics/Download";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import Select from "../ui/Select";
import { Button } from "../ui/Button";

export const SummaryCard = () => {
  return (
    <div className="bg-white rounded-lg p-10 flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="text-black text-[22px] font-bold ">Analytics</p>
        <div className="flex">
          <Select items={["Alll Banks"]} />
          <Select items={["Last 3- Days"]} />
          <Button>
            <Download />
            Download Receipt
          </Button>
        </div>
      </div>
      <div className="flex justify-between">
        {stats.map((stat, index) => (
          <div className=" border rounded-lg p-4" key={index}>
            <p className="text-neutral-400 text-base font-medium ']">
              {stat.name}
            </p>
            <div className="flex items-center gap-10">
              <p className="text-black text-[32px] font-medium font-['Inter']">
                {stat.value}
              </p>
              <div
                className={`flex rounded-full items-center ${
                  stat.up
                    ? "border-success text-success"
                    : "border-error text-error"
                } `}
              >
                <i>{stat.up ? <FaArrowUp /> : <FaArrowDown />}</i>
                <p>{stat.rate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const stats = [
  {
    name: "Total Balance",
    value: "1,233,000.65",
    rate: "12%",
    up: true,
  },
  {
    name: "Total Balance",
    value: "1,233,000.65",
    rate: "12%",
    up: true,
  },
  {
    name: "Total Balance",
    value: "1,233,000.65",
    rate: "12%",
    up: false,
  },
];
