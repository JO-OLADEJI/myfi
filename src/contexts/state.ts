import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SupportedBanks, Transaction } from "@/types/banks.type";

interface AppState {
  // web5
  did: string;
  isDidConnected: boolean;
  toggleDidConnection: () => void;
  setDid: (connectedDid: string) => void;

  // finance
  totalBalance: number;
  connectedBanks: string[];
  transactions: Transaction[];
  setTransactions: (newTransactions: Transaction[]) => void;
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      did: "",
      isDidConnected: false,
      toggleDidConnection: () =>
        set((state) => ({ isDidConnected: !state.isDidConnected })),
      setDid: (connectedDid: string) => set({ did: connectedDid }),

      totalBalance: 153000.65,
      connectedBanks: [SupportedBanks.UBA, SupportedBanks.KUDA],
      transactions: [],
      setTransactions: (newTransactions: Transaction[]) =>
        set({ transactions: newTransactions }),
    }),
    {
      name: "app-store",
      partialize: (state) => ({ isDidConnected: state.isDidConnected }),
    }
  )
);

export default useAppStore;
