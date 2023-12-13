import { useCallback } from "react";
import useAppStore from "@/contexts/state";
import { Web5 } from "@web5/api";
import protocolDefinition from "@/protocol1.json";
import { Transaction } from "@/types/banks.type";

interface DwnTransaction extends Transaction {
  recordId: string;
}

interface DwnRecordOperations {
  syncTxsToDwn: (web5: Web5) => Promise<void>;
  getTxsFromDwn: (web5: Web5) => Promise<DwnTransaction[]>;
  getTxsFromApi: (from: string) => Promise<Transaction[]>;
}

const useDwnRecord = (): DwnRecordOperations => {
  const did = useAppStore((state) => state.did);

  const getTxsFromDwn = useCallback(
    async (web5: Web5): Promise<DwnTransaction[]> => {
      console.log("Fetching Txs from user's DWN...");
      try {
        const response = await web5.dwn.records.query({
          message: {
            filter: {
              protocol: protocolDefinition.protocol,
            },
          },
        });

        if (response.status.code === 200) {
          const txs = await Promise.all(
            response.records?.map(async (record) => {
              const data = await record.data.json();
              return {
                ...data,
                recordId: record.id,
              };
            }) ?? []
          );

          return txs;
        } else {
          console.error("Error fetching Txs:", response.status);
        }
      } catch (error) {
        console.error("Error", error);
      }
      return [];
    },
    []
  );

  const getTxsFromApi = useCallback(
    async (from?: string): Promise<Transaction[]> => {
      console.log("Fetching Txs from API...");
      const url = new URL("https://myfi-mbsj.onrender.com/connect/10010/gt");
      const request = new Request(url, {
        method: "POST",
        body: from !== "" ? JSON.stringify({ startDate: from }) : undefined,
        headers: {
          "Content-Type": "application/json",
        },
      });

      try {
        const response = await fetch(request);
        const apiTxs = await response.json();
        return apiTxs;
      } catch (error) {
        console.error("Error in fetchReceivedDirectMessages:", error);
      }
      return [];
    },
    []
  );

  const addTxsToDwn = useCallback(
    async (web5: Web5, txs: Transaction[]) => {
      console.log("Adding Txs to user's DWN...");
      try {
        const requests = txs.map(async (tx) => {
          return web5.dwn.records
            .write({
              data: tx,
              message: {
                protocol: protocolDefinition.protocol,
                protocolPath: "transaction",
                schema: protocolDefinition.types.transaction.schema,
                recipient: did,
              },
            })
            .then((response) => ({
              record: response.record,
              status: response.status,
            }));
        });
        await Promise.all(requests);

        console.log("Transactions stored in DWN successfully...");
      } catch (error) {
        console.error("Error", error);
      }
    },
    [did]
  );

  const syncTxsToDwn = useCallback(
    async (web5: Web5) => {
      try {
        // 1. query the transactions in the user's DWN
        const dwnTxs = await getTxsFromDwn(web5);

        // 2a. Sort the transactions in timestamp descending order
        if (dwnTxs.length > 0) {
          const sortedDwnTxs = dwnTxs.sort(
            (a, b) =>
              new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf()
          );

          // 3. call the api with the latest transaction timestamp gotten from the user's DWN
          const apiTxs = await getTxsFromApi(sortedDwnTxs[0].timestamp);

          if (apiTxs.length > 0) {
            // 4. append the latest transactions to the user's DWN
            await addTxsToDwn(web5, apiTxs);
          }
        } else {
          // 2b. add all transactions to the user's DWN
          const apiTxs = await getTxsFromApi();
          await addTxsToDwn(web5, [...apiTxs.slice(0, apiTxs.length)]);
        }
      } catch (error) {
        console.error("Error configuring remote protocol...");
      }
    },
    [addTxsToDwn, getTxsFromApi, getTxsFromDwn]
  );

  return { syncTxsToDwn, getTxsFromDwn, getTxsFromApi };
};

export default useDwnRecord;
