import { ConnectBanks } from "../components/ConnectBanks";
import { MainCard } from "../components/MainCard";
import { SpendingTracker } from "../components/SpendingTracker";
import { TransactionHistory } from "../components/TransactionHistory";

export const Dashboard = () => {
  return (
    <div className="flex justify-between grow">
      <main>
        <MainCard />
        <ConnectBanks />
        <TransactionHistory />
      </main>
      <SpendingTracker />
    </div>
  );
};
