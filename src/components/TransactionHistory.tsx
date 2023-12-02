import { Kuda, Uba } from "@/assets/banks-logo";

export const TransactionHistory = () => {
  return (
    <div className="bg-white p-10  rounded-lg ">
      <p className=" text-neutral-400 text-lg font-normal ">
        Transaction History
      </p>
      <div className="flex flex-col gap-3">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex">
            <div className="flex flex-col">
              <div className="bg-neutral-100 rounded-full w-12 h-12 flex items-center justify-center">
                <Kuda />
              </div>
            </div>
            <div className="flex flex-col ml-4">
              <p className="font-normal">{transaction.name}</p>
              <p className="text-neutral-400 text-xs font-normal">
                Sent from {transaction.from}
              </p>
            </div>
            <div className="flex flex-col ml-auto">
              <p>{transaction.date}</p>
              <p className="text-neutral-400 text-xs font-normal">
                {transaction.time}
              </p>
            </div>
            <div className="flex flex-col ml-auto">
              <p
                className={`${
                  transaction.type === "DEBIT" ? "text-error" : "text-success"
                }`}
              >
                {transaction.type === "DEBIT" ? "-" : "+"} {transaction.amount}
              </p>
              <p className="text-neutral-400 text-xs font-normal">
                {transaction.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const transactions = [
  {
    name: "Aliu Bajo",
    from: "Uba",
    date: "27 Sept 2023",
    time: "10:06 AM",
    amount: "15,000",
    type: "DEBIT",
    description: "Food Money",
  },
  {
    name: "Aliu Bajo",
    from: "Uba",
    date: "27 Sept 2023",
    time: "10:06 AM",
    amount: "15,000",
    type: "CREDIT",
    description: "Food Money",
  },
];
