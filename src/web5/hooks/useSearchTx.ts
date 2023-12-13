import Fuse, { FuseResult, FuseResultMatch } from "fuse.js";
import useAppStore from "@/contexts/state";
import { useEffect, useState } from "react";
import { Transaction, SearchKey } from "@/types/banks.type";

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
    "dateLiteral",
    "desc",
  ],
};

const isMatch = (matches: readonly FuseResultMatch[], key: string) => {
  for (let i = 0; i < matches.length; i++) {
    if (matches[i].key?.includes(key)) {
      return true;
    }
  }
  return false;
};

interface SearchParams {
  filterKey: SearchKey | "";
  searchPayload: string;
}

const useSearchTx = ({
  filterKey,
  searchPayload,
}: SearchParams): FuseResult<Transaction>[] => {
  const transactions = useAppStore((state) => state.transactions);
  const [result, setResult] = useState<FuseResult<Transaction>[]>([]);
  let fuse: Fuse<Transaction>;

  useEffect(() => {
    fuse = new Fuse(transactions, searchOptions);
    const searchResult = fuse.search(searchPayload);

    switch (filterKey) {
      case "from":
        setResult(() => {
          return searchResult.filter((match) =>
            match.matches
              ? match.item.amountOut > match.item.amountIn // debit tx
                ? isMatch(match.matches, filterKey)
                : false
              : false
          );
        });
        break;

      case "to":
        setResult(() => {
          return searchResult.filter((match) =>
            match.matches
              ? match.item.amountIn > match.item.amountOut // credit tx
                ? isMatch(match.matches, filterKey)
                : false
              : false
          );
        });
        break;

      case "date":
        setResult(() => {
          return searchResult.filter((match) =>
            match.matches ? isMatch(match.matches, "dateLiteral") : false
          );
        });
        break;

      case "amountIn":
      case "amountOut":
      case "desc":
        setResult(() => {
          return searchResult.filter((match) =>
            match.matches ? isMatch(match.matches, filterKey) : false
          );
        });
        break;

      default:
        setResult(() => searchResult);
    }
  }, [searchPayload, filterKey]);

  return result;
};

export default useSearchTx;
