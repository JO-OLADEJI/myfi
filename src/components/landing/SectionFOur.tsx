import { ArrowRight } from "lucide-react";

export const SectionFour = () => {
  return (
    <div className="min-h-screen bg-primary gap-20 py-10 text-white flex flex-col justify-center items-center">
      <div className="flex flex-col gap-10">
        <p className="text-center text-white text-[45px] font-bold">
          We are breaking barriers with
          <br /> technology in the finance world
        </p>
        <p className="text-center text-white text-opacity-90 text-[22px] font-normal font-['Inter'] leading-[34px]">
          MyFi is built on technologies like Web5, solidity, typescript and many
          modern languages <br /> to adapt to the fast growing world and still
          adequately solve user’s problems.
        </p>
      </div>
      <div className="flex">
        <button className="btn text-primary bg-white rounded-full">
          Watch full demo <ArrowRight />
        </button>
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center">
          <img src="/landing/left-round.png" />
        </div>
        <div>
          <img src="/landing/section-4-pad.png" />
        </div>
        <div>
          <img src="/landing/right-round.png" />
        </div>
      </div>
    </div>
  );
};
