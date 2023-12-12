import Fuse, { FuseResult } from "fuse.js";
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
    "timestamp",
    "desc",
  ],
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
          return searchResult.filter((match) => {
            if (match.matches) {
              // must be a debit transaction
              if (match.item.amountOut > match.item.amountIn) {
                for (let i = 0; i < match.matches.length; i++) {
                  if (match.matches[i].key?.includes(filterKey)) {
                    return true;
                  }
                }
              }
              return false;
            }
          });
        });
        break;
      case "to":
        setResult(() => {
          return searchResult.filter((match) => {
            if (match.matches) {
              // must be a credit transaction
              if (match.item.amountIn > match.item.amountOut) {
                for (let i = 0; i < match.matches.length; i++) {
                  if (match.matches[i].key?.includes(filterKey)) {
                    return true;
                  }
                }
              }
              return false;
            }
          });
        });
        break;
      case "amountIn":
      case "amountOut":
      case "timestamp":
      case "desc":
        setResult(() => {
          return searchResult.filter((match) => {
            if (match.matches) {
              for (let i = 0; i < match.matches.length; i++) {
                if (match.matches[i].key?.includes(filterKey)) {
                  return true;
                }
              }
            }
            return false;
          });
        });
        break;
      default:
        setResult(() => searchResult);
    }
  }, [searchPayload, filterKey]);

  return result;
};

export default useSearchTx;
