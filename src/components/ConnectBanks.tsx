/* eslint-disable react/react-in-jsx-scope */
import { Plus } from "@/assets/banks-connected";
import useAppStore from "@/contexts/state";
import { getBankLogo } from "@/lib/utils";
import { Button } from "./ui/Button";
import { SupportedBanks } from "@/types/banks.type";
import { useState } from "react";

export const ConnectBanks = () => {
  const connectedBanks = useAppStore((state) => state.connectedBanks);
  const allBanks: SupportedBanks[] = Object.values(SupportedBanks);
  const [isConnectingBank, setIsconnectingBank] = useState<boolean>(false);

  const handleShowModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("display modal");
    // @ts-expect-error - element is possibly null
    document.getElementById("my_modal_2")?.showModal();
  };

  const handleConnectBank = async (bank: SupportedBanks) => {
    setIsconnectingBank(true);

    const url = new URL("http://localhost:1000/myfi/connect-bank");
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify({ name: bank }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      const response = await fetch(request);
      const info = await response.json();
      // add transactons to DWN
      // update transactions in useAppStore
      // console.log(info);
    } catch (error) {
      console.error("Error in handleConnectBank:", error);
    }
    setIsconnectingBank(false);
  };

  return (
    <div className="bg-white p-6 flex flex-col gap-3 rounded-3xl">
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box h-48">
          <h3 className="font-bold text-lg text-center mb-5">Connect a Bank</h3>
          <div className="flex">
            {!isConnectingBank ? (
              allBanks.map((bank, index) => (
                <div
                  key={index}
                  className={`.border p-2 ml-2 mr-2 rounded-3xl items-center justify-center w-24 h-24 h-full ${
                    connectedBanks.includes(bank)
                      ? "cursor-not-allowed opacity-30"
                      : "cursor-pointer opacity-100"
                  }`}
                  onClick={() => handleConnectBank(bank)}
                >
                  {getBankLogo(bank)}
                </div>
              ))
            ) : (
              <p>Connecting . . .</p>
            )}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <p className="text-neutral-400 text-lg font-normal">Connected Banks</p>
      <div className=" flex">
        <Button
          className="text-blue-700 text-base font-normal mr-5"
          onClick={handleShowModal}
        >
          <div className="p-4 rounded-full border-2 border-dashed border-blue-700">
            <Plus />
          </div>
        </Button>
        <div className="w-14 flex items-center  gap-4">
          {connectedBanks.map((bank, index) => (
            <div
              key={index}
              className=" flex border p-2 rounded-full items-center justify-center min-w-[60px] min-h-[50px] h-full"
            >
              {getBankLogo(bank)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>open modal</button>;
