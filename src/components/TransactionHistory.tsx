import { Kuda } from "@/assets/banks-logo";
import transactions from "@/transactions.json";

export const TransactionHistory = () => {
  return (
    <div className="bg-white p-10 rounded-3xl">
      <p className=" text-neutral-400 text-lg font-normal mb-5">
        Transaction History
      </p>
      <div className="flex flex-col gap-6 overflow-auto max-h-[24vh] scroll-bar">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex">
            <div className="flex flex-col">
              <div className="bg-neutral-100 rounded-full w-12 h-12 flex items-center justify-center">
                <Kuda />
              </div>
            </div>
            <div className="flex flex-col ml-4 w-3/6">
              <p className="font-normal truncate">{transaction.to.name}</p>
              <p className="text-neutral-400 text-xs font-normal">
                Sent from {transaction.from.bank}
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
