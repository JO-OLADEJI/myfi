import {
  AirtimeData,
  Flex,
  Food,
  Fuel,
  Others,
} from "@/assets/spending-tracker";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Select } from "./ui/Select.tsx";
import useAppStore from "@/contexts/state.ts";
import { useEffect, useState } from "react";
import { DwnTransaction } from "@/types/banks.type.ts";

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

type Props = {
  percentage: string;
} & DwnTransaction;

export const SpendingTracker = ({ noHeader }: { noHeader?: boolean }) => {
  const { transactions } = useAppStore();

  const [txns, setTxns] = useState<Props[]>([]);
  useEffect(() => {
    const uniqueTransactions = transactions.filter(
      (transaction, index, self) =>
        index === self.findIndex((t) => t.desc === transaction.desc)
    );
    transactions.forEach((transaction) => {
      uniqueTransactions.forEach((item) => {
        if (item.desc === transaction.desc) {
          if (transaction.amountOut > transaction.amountIn) {
            item.amountOut += transaction.amountOut;
          }
        }
      });
    });
    const totalSum = uniqueTransactions
      .map((item) => item.amountOut)
      .reduce((prev, curr) => prev + curr, 0);

    const u = uniqueTransactions.map((item) => {
      return {
        ...item,
        percentage: `${Math.round((item.amountOut / totalSum) * 100)}%`,
      };
    });
    setTxns(u);
  }, [transactions]);

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
      <div className="flex flex-col gap-3 h-[36vh] scroll-bar overflow-auto -mt-10">
        {txns.map((item, index) => (
          <div className="flex  gap-10 items-center" key={index}>
            {getIcon(item.desc)}
            <div className=" w-[250px]">
              <p className="font-semibold">{item.desc}</p>
              <div className="flex items-center gap-3 ">
                <div
                  className="h-2 rounded-lg"
                  style={{
                    width: `calc(${item.percentage} + 2px)`,
                    background: getBg(item.desc),
                  }}
                />
                <p>{item.percentage}</p>
              </div>
            </div>

            <p>N {item.amountOut.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const getIcon = (name: string) => {
  switch (name) {
    case "Airtime/Data":
    case "Industrial":
      return <AirtimeData />;
    case "Food":
      return <Food />;
    case "Fuel":
    case "Electronics":
      return <Fuel />;
    case "Flex":
    case "Toys":
      return <Flex />;
    case "Others":
      return <Others />;
    default:
      return <Others />;
  }
};

const getBg = (name: string) => {
  switch (name) {
    case "Airtime/Data":
    case "Industrial":
      return "#9747FF66";

    case "Food":
    case "Computers":
      return "#E62C4666";

    case "Fuel":
    case "Electronics":
      return "#61BC5166";

    case "Flex":
    case "Toys":
      return "#FFC40066";
    case "Grocery":
    case "Others":
      return "#74512566";
    default:
      return "#61BC5166";
  }
};
