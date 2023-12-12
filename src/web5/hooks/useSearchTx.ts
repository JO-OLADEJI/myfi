import Fuse, { FuseResult } from "fuse.js";
import useAppStore from "@/contexts/state";
import { useEffect, useState } from "react";
import { Transaction } from "@/types/banks.type";

const searchOptions = {
  isCaseSensitive: false,
  includeMatches: true,
  threshold: 0.0,
  ignoreLocation: true,
  keys: [
    "from.name",
    "from.bank",
    "to.name",
    "to.bank",
    "amountIn",
    "amountOut",
    "timestamp",
    "desc",
  ],
};

interface SearchParams {
  searchPayload: string;
}

const useSearchTx = ({
  searchPayload,
}: SearchParams): FuseResult<unknown>[] => {
  const transactions = useAppStore((state) => state.transactions);
  const [result, setResult] = useState<FuseResult<Transaction>[]>([]);
  let fuse: Fuse<Transaction>;

  useEffect(() => {
    fuse = new Fuse(transactions, searchOptions);
    setResult(() => fuse.search(searchPayload));
  }, [searchPayload]);

  return result;
};

export default useSearchTx;
