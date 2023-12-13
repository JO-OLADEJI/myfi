import { SectionFour } from "@/components/landing/SectionFOur";
import { SectionThree } from "@/components/landing/SectionThree";
import { SectionTwo } from "@/components/landing/SectionTwo";
import { SetionOne } from "@/components/landing/SetionOne";

export const Home = (): JSX.Element => {
  return (
    <div>
      <SetionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
    </div>
  );
};
