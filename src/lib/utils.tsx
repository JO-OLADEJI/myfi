import { Default, Fidelity, Gt, Kuda, Uba, Zenith } from "@/assets/banks-logo";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
