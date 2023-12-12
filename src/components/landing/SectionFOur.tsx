import { ArrowRight } from "lucide-react";

export const SectionFour = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div>
        <p>
          We are breaking barriers with
          <br /> technology in the finance world
        </p>
        <p>
          MyFi is built on technologies like Web5, solidity, typescript and many
          modern languages <br /> to adapt to the fast growing world and still
          adequately solve user’s problems.
        </p>
      </div>
      <div className="flex">
        <button className="brn btn-primary rounded-full">
          Watch full demo <ArrowRight />
        </button>
      </div>
    </div>
  );
};
