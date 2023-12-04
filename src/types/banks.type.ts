export enum SupportedBanks {
  UBA = "UBA",
  KUDA = "Kuda",
  FIDELITY = "Fidelity",
  GTBANK = "GTBank",
  KEYSTONE = "Keystone",
}

interface Entity {
  name: string;
  bank: string;
}

export interface Transaction {
  from: Entity;
  to: Entity;
  amountIn: Number;
  amountOut: Number;
  timestamp: String;
  desc: String;
}
