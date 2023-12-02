export const TransactionHistory = () => {
  return (
    <div className="bg-white p-10  rounded-lg ">
      <p className=" text-neutral-400 text-lg font-normal ">
        Transaction History
      </p>
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
];
