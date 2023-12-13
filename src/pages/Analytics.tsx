import React from "react";
import { SpendingTracker } from "@/components/SpendingTracker";
import { TransactionHistory } from "@/components/TransactionHistory";
import { SummaryCard } from "@/components/analytics/SummaryCard";

export const Analytics = () => {
  return (
    <div className="flex flex-col gap-5">
      <SummaryCard />
      <div className="flex justify-between">
        <div className="flex flex-col justify-between">
          <div>Charts</div>
          <TransactionHistory />
        </div>
        <SpendingTracker noHeader />
      </div>
    </div>
  );
};
