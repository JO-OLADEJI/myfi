import { AirtimeData } from "../assets/spending-tracker/AirtimeData";

export const SpendingTracker = () => {
  return (
    <div className="bg-white p-4 m-4 rounded-lg ">
      <h2> How are you spending your money?</h2>
      <div>
        {trackItems.map((item, index) => (
          <div key={index}>
            {getIcon(item.name)}
            <div>
              <p>{item.name}</p>
              <p>{item.percentage}</p>
            </div>
            <div>
              <p>{item.amount}</p>
            </div>
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
    default:
      return <AirtimeData />;
  }
};

const trackItems = [
  {
    name: "Airtime/Data",
    percentage: "34.3%",
    amount: "N114,000.74",
  },
  {
    name: "Airtime/Data",
    percentage: "34.3%",
    amount: "N114,000.74",
  },
  {
    name: "Airtime/Data",
    percentage: "34.3%",
    amount: "N114,000.74",
  },
];
