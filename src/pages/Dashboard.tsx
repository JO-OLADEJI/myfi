import { ConnectBanks } from "../components/ConnectBanks";
import { MainCard } from "../components/MainCard";
import { SpendingTracker } from "../components/SpendingTracker";
import { TransactionHistory } from "../components/TransactionHistory";

export const Dashboard = () => {
  return (
    <div className="flex justify-between gap-10 grow ">
      <main className="grow flex flex-col gap-10">
        <MainCard />
        <ConnectBanks />
        <TransactionHistory />
      </main>
      <SpendingTracker />
    </div>
  );
};
