import {
  AirtimeData,
  Flex,
  Food,
  Others,
  Fuel,
} from "@/assets/spending-tracker";
import { Select } from "./ui/Select";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Airtime/Data", "Food", "Fuel", "Flex", "Others"],
  datasets: [
    {
      circumference: 360,
      data: [114000.74, 103270.74, 74000.45, 37000, 14000.53],
      backgroundColor: [
        "#9747FF19",
        "#E62C4619",
        "#61BC5119",
        "#FFC40019",
        "#74512519",
      ],
      borderColor: ["#9747FF", "#E62C46", "#61BC51", "#FFC400", "#745125"],
      borderWidth: 1,
      spacing: 5,
    },
  ],
};

export const SpendingTracker = ({ noHeader }: { noHeader?: boolean }) => {
  return (
    <div className="bg-white p-4 pt-8  rounded-3xl flex flex-col gap-10 ">
      <div className="bg-info p-4 rounded-xl flex items-center justify-center">
        <h2 className="text-primary">
          &#129488; How are you spending your money?
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-primary font-bold text-2xl">Spending Tracker</h1>

        {noHeader ? null : <Select items={["Mar 2023"]} />}

        <div className="h-[22rem]">
          <Doughnut data={data} />
        </div>
      </div>
      <div className="flex flex-col gap-3 -mt-10">
        {trackItems.map((item, index) => (
          <div className="flex  gap-10 items-center" key={index}>
            {getIcon(item.name)}
            <div className=" w-[250px]">
              <p className="font-semibold">{item.name}</p>
              <div className="flex items-center gap-3 ">
                <div
                  className="h-2 rounded-lg"
                  style={{
                    width: `calc(${item.percentage} + 50px)`,
                    background: getBg(item.name),
                  }}
                />
                <p>{item.percentage}</p>
              </div>
            </div>

            <p>{item.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const getIcon = (name: string) => {
  switch (name) {
    case "Airtime/Data":
      return <AirtimeData />;
    case "Food":
      return <Food />;
    case "Fuel":
      return <Fuel />;
    case "Flex":
      return <Flex />;
    case "Others":
      return <Others />;
    default:
      return <AirtimeData />;
  }
};

const getBg = (name: string) => {
  switch (name) {
    case "Airtime/Data":
      return "#9747FF66";

    case "Food":
      return "#E62C4666";

    case "Fuel":
      return "#61BC5166";

    case "Flex":
      return "#FFC40066";
    case "Others":
      return "#74512566";
    default:
      return "#F4F6FF66";
  }
};
const trackItems = [
  {
    name: "Airtime/Data",
    percentage: "34.3%",
    amount: "N103,270.74",
  },
  {
    name: "Food",
    percentage: "29.14%",
    amount: "N74,000.74",
  },
  {
    name: "Fuel",
    percentage: "22.5%",
    amount: "N74,000.74",
  },
  {
    name: "Flex",
    percentage: "13%",
    amount: "N37,000",
  },
  {
    name: "Others",
    percentage: "2.5%",
    amount: "N14,000.53",
  },
];
