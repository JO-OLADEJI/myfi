import { Kuda, Uba, Zenith, Gt, Fidelity, Default } from "@/assets/banks-logo";
import useAppStore from "@/contexts/state";
import { useEffect } from "react";

export const TransactionHistory = () => {
  const transactions = useAppStore((state) => state.transactions);
  const setTransactions = useAppStore((state) => state.setTransactions);

  const url = new URL("https://myfi-mbsj.onrender.com/connect/10010/gt");
  const request = new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="bg-white p-10 rounded-3xl">
      <p className=" text-neutral-400 text-lg font-normal mb-5">
        Transaction History
      </p>
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

const getBankLogo = (bank: string) => {
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
