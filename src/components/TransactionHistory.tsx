import React, { useCallback } from "react";
import useAppStore from "@/contexts/state";
import { Web5Context } from "@/contexts/web5";
import { getBankLogo } from "@/lib/utils";
import { useDwnRecord, useSearchTx } from "@/web5/hooks";
import { useContext, useEffect, useState } from "react";
import { InfoIcon, SearchIcon, TagIcon } from "@/assets/icons";
import { SearchKey, DwnTransaction } from "@/types/banks.type";

export const TransactionHistory = () => {
  const { web5 } = useContext(Web5Context);
  const { syncTxsToDwn, getTxsFromDwn, addTagToTx } = useDwnRecord();
  const transactions = useAppStore((state) => state.transactions);
  const setTransactions = useAppStore((state) => state.setTransactions);
  const [searchLiteral, setSearchLiteral] = useState<string>("");
  const [searchFilterOn, setSearchFilterOn] = useState<boolean>(false);
  const [searchFilterIndex, setSearchFilterIndex] = useState<number>(0);
  const searchFilter: SearchKey[] = [
    "from",
    "to",
    "amountIn",
    "amountOut",
    "date",
    "desc",
  ];
  const searchresult = useSearchTx({
    filterKey: searchFilterOn ? searchFilter[searchFilterIndex] : "",
    searchPayload: searchLiteral,
  });

  const switchSearchFilter = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Tab") {
        event.preventDefault();

        if (!searchFilterOn) {
          setSearchFilterOn(true);
        } else {
          setSearchFilterIndex(
            (prevIndex) => (prevIndex + 1) % searchFilter.length
          );
        }

        console.log("toggle search filters . . .");
      } else if (event.key === "Escape") {
        searchFilterOn && setSearchFilterOn(false);
      }
    },
    [searchFilter.length, searchFilterOn]
  );

  const handleTagClick = useCallback(
    (tx: DwnTransaction) => {
      if (web5) {
        addTagToTx(web5, tx.recordId);
      }
    },
    [addTagToTx, web5]
  );

  useEffect(() => {
    const syncTxs = async () => {
      if (web5) {
        await syncTxsToDwn(web5);
        const txs = await getTxsFromDwn(web5);
        setTransactions(
          txs.map((tx) => ({
            ...tx,
            dateLiteral: new Date(tx.timestamp)
              .toUTCString()
              .match(/\d{2}.*\d{4}/)?.[0],
          }))
        );
      }
    };
    syncTxs();
  }, [web5, getTxsFromDwn, syncTxsToDwn, setTransactions]);

  return (
    <div className="bg-white p-6 rounded-3xl">
      <p className=" text-neutral-400 text-lg font-normal mb-3 text-center">
        Transaction History
      </p>
      <div className="flex mb-4 items-center gap-2">
        <SearchIcon className="w-6 h-6" />
        <input
          type="text"
          value={
            searchFilterOn
              ? `${searchFilter[searchFilterIndex]}: ${searchLiteral}`
              : searchLiteral
          }
          onChange={(e) =>
            setSearchLiteral(
              searchFilterOn
                ? e.target.value.substring(
                    searchFilter[searchFilterIndex].length + 2
                  )
                : e.target.value
            )
          }
          onKeyDown={switchSearchFilter}
          placeholder="search transactions"
          className="border grow p-2 pl-5 pr-5 rounded-full"
        />
        <InfoIcon className="w-4 h-4 cursor-pointer" />
      </div>
      <div className="flex flex-col gap-6 overflow-auto max-h-[24vh] scroll-bar">
        {(searchLiteral
          ? searchresult.map((match) => match.item as DwnTransaction)
          : transactions
        )
          .sort(
            (a, b) =>
              new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf()
          )
          .map((transaction, index) => (
            <div key={index} className="flex">
              <div className="flex flex-col">
                <div className="bg-neutral-100 rounded-full w-12 h-12 flex items-center justify-center">
                  {transaction.amountIn > transaction.amountOut
                    ? getBankLogo(transaction.to.bank)
                    : getBankLogo(transaction.from.bank)}
                </div>
              </div>
              <div className="flex flex-col ml-4 w-3/6">
                <p className="font-normal truncate">
                  {transaction.amountIn > transaction.amountOut
                    ? `${transaction.from.name}`
                    : `${transaction.to.name}`}
                </p>
                <p className="text-neutral-400 text-xs font-normal">
                  {transaction.amountIn > transaction.amountOut
                    ? `Received in ${transaction.to.bank}`
                    : `Sent from ${transaction.from.bank}`}
                </p>
              </div>
              <div className="flex flex-col ml-auto w-2/6">
                <p>
                  {transaction.dateLiteral ??
                    new Date(transaction.timestamp)
                      .toUTCString()
                      .match(/\d{2}.*\d{4}/)?.[0]}
                </p>
                <p className="text-neutral-400 text-xs font-normal">
                  {new Date(transaction.timestamp).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </p>
              </div>
              <div className="flex flex-col pr-2 w-1/6 text-right border">
                <p
                  className={`${
                    transaction.amountOut > transaction.amountIn
                      ? "text-error"
                      : "text-success"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html:
                      transaction.amountOut > transaction.amountIn
                        ? `-&#8358;${new Intl.NumberFormat().format(
                            transaction.amountOut - transaction.amountIn
                          )}`
                        : `+&#8358;${new Intl.NumberFormat().format(
                            transaction.amountIn - transaction.amountOut
                          )}`,
                  }}
                />
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    readOnly={true}
                    value={transaction.desc}
                    className="text-neutral-400 text-xs font-normal border w-5/6"
                  />
                  <TagIcon
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleTagClick(transaction)}
                  />
                </div>
                {/* <p className="text-neutral-400 text-xs font-normal truncate">
                  {transaction.desc}
                </p> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
