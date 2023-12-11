import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Kuda, Uba, Zenith, Gt, Fidelity, Default } from "@/assets/banks-logo";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBankLogo = (bank: string): JSX.Element => {
  switch (bank.toLowerCase()) {
    case "kuda":
      return <Kuda />;
    case "gtbank":
      return <Gt />;
    case "uba":
      return <Uba />;
    case "fidelity":
      return <Fidelity />;
    case "keystone":
      return <Zenith />;
    default:
      return <Default />;
  }
};
