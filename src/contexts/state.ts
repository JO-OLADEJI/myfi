import { create } from "zustand";

interface AppState {
  did: string;
  setDid: (connectedDid: string) => void;
}

const useAppStore = create<AppState>((set) => ({
  did: "",
  setDid: (connectedDid: string) => set({ did: connectedDid }),
}));

export default useAppStore;
