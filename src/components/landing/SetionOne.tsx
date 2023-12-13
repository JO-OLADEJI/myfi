import React from "react";

import { ArrowRight } from "lucide-react";

export const SetionOne = () => {
  return (
    <section className="w-full  flex flex-col items-center justify-center gap-2 md:gap-10 py-20">
      <div className=" text-center flex flex-col  items-center">
        <span className="text-neutral-800 text-[24px] md:text-[64px] font-semibold ">
          Track all your transactions in <br /> one place with
          <b className="text-blue-700 pl-4 md:text-[64px] font-semibold font-['Inter'] ">
            MyFi
          </b>
        </span>
      </div>
      <div className=" text-center text-neutral-500  md:text-2xl font-normal font-['Inter'] leading-[34px]">
        You can have all your accounts synced
        <br />
        for better management.
      </div>
      <div className=" flex items-center justify-center">
        <button className="btn w-max text-white md:btn-lg rounded-full btn-primary">
          Sync now <ArrowRight />
        </button>
      </div>
      <div className="   w-full h-100vh flex justify-center">
        <img src="/landingimage.png" />
      </div>
    </section>
  );
};
