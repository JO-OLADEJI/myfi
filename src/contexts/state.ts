import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SupportedBanks, DwnTransaction } from "@/types/banks.type";

interface AppState {
  // web5
  did: string;
  isDidConnected: boolean;
  isProtocolConfigured: boolean;
  toggleDidConnection: () => void;
  setDid: (connectedDid: string) => void;
  setIsProtocolConfigured: (isConfigured: boolean) => void;

  // finance
  totalBalance: number;
  connectedBanks: string[];
  transactions: DwnTransaction[];
  setTransactions: (newTransactions: DwnTransaction[]) => void;
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      did: "",
      isDidConnected: false,
      isProtocolConfigured: false,
      toggleDidConnection: () =>
        set((state) => ({ isDidConnected: !state.isDidConnected })),
      setDid: (connectedDid: string) => set({ did: connectedDid }),
      setIsProtocolConfigured: (isConfigured: boolean) =>
        set({ isProtocolConfigured: isConfigured }),

      totalBalance: 153000.65,
      connectedBanks: [SupportedBanks.UBA, SupportedBanks.KUDA],
      transactions: [],
      setTransactions: (newTransactions: DwnTransaction[]) =>
        set({ transactions: newTransactions }),
    }),
    {
      name: "app-store",
      partialize: (state) => ({ isDidConnected: state.isDidConnected }),
    }
  )
);

export default useAppStore;
