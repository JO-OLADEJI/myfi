import {
  AirtimeData,
  Flex,
  Food,
  Others,
  Fuel,
} from "../assets/spending-tracker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const SpendingTracker = () => {
  return (
    <div className="bg-white p-4 m-4 rounded-lg flex flex-col gap-10 ">
      <div className="bg-info p-4 rounded-lg flex items-center justify-center">
        <h2> How are you spending your money?</h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-primary font-bold text-2xl">Spending Tracker</h1>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-3">
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
      return "#9747FF ";

    case "Food":
      return "#E62C46";

    case "Fuel":
      return "#61BC51";

    case "Flex":
      return "#FFC400";
    case "Others":
      return "#745125";
    default:
      return "#F4F6FF";
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
