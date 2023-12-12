import useAppStore from "@/contexts/state";
import { Web5Context } from "@/contexts/web5";
import { getBankLogo } from "@/lib/utils";
import { useDwnRecord } from "@/web5/hooks";
import { useContext, useEffect, useState } from "react";
import { InfoIcon, SearchIcon } from "@/assets/icons";
// import { isMobile, isMacOs, isWindows } from "react-device-detect";

export const TransactionHistory = () => {
  const { web5 } = useContext(Web5Context);
  const { syncTxsToDwn, getTxsFromDwn } = useDwnRecord();
  const transactions = useAppStore((state) => state.transactions);
  const setTransactions = useAppStore((state) => state.setTransactions);
  const [searchLiteral, setSearchLiteral] = useState<string>("");

  useEffect(() => {
    const syncTxs = async () => {
      if (web5) {
        await syncTxsToDwn(web5);
        const txs = await getTxsFromDwn(web5);
        setTransactions(txs);
      }
    };
    syncTxs();
  }, [web5]);

  return (
    <div className="bg-white p-6 rounded-3xl">
      <p className=" text-neutral-400 text-lg font-normal mb-3 text-center">
        Transaction History
      </p>
      <div className="flex mb-4 items-center gap-2">
        <SearchIcon className="w-6 h-6" />
        <input
          type="text"
          value={searchLiteral}
          onChange={(e) => setSearchLiteral(e.target.value)}
          placeholder="search transactions"
          className="border grow p-2 pl-5 pr-5 rounded-full"
        />
        <InfoIcon className="w-4 h-4 cursor-pointer" />
      </div>
      <div className="flex flex-col gap-6 overflow-auto max-h-[24vh] scroll-bar">
        {transactions
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
                  {
                    new Date(transaction.timestamp)
                      .toUTCString()
                      .match(/\d{2}.*\d{4}/)?.[0]
                  }
                </p>
                <p className="text-neutral-400 text-xs font-normal">
                  {new Date(transaction.timestamp).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </p>
              </div>
              <div className="flex flex-col pr-2 w-1/6 text-right">
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
                <p className="text-neutral-400 text-xs font-normal truncate">
                  {transaction.desc}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
