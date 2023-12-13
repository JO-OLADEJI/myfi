import React from "react";

export const SectionThree = () => {
  return (
    <div className="min-h-screen py-10 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-3">
        <p className=" text-center text-neutral-800 text-[24px] md:text-[45px] font-bold ">
          Fully Decentralized.
          <br />
          Completely Secure.
        </p>
        <p className=" text-center text-neutral-500 md:text-[22px] font-normal  md:leading-[34px]">
          You can have all your accounts synced
          <br />
          for better management.
        </p>
      </div>
      <div className="flex flex-col md:flex-row py-10 md:py-0 gap-20">
        {cards.map((card, index) => (
          <div
            key={index}
            className=" max-w-[350px] items-center justify-center h-max flex flex-col gap-3 p-6 rounded-lg shadow-lg"
          >
            <img
              className="h-[139px] w-[132.9px]"
              src={card.icon}
              alt={card.title}
            />
            <p className="text-primary text-center  text-2xl font-semibold font-['Inter'] leading-[34px]">
              {card.title}
            </p>
            <p className="text-center">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const cards = [
  {
    title: "Say no to manual tracking",
    desc: `Why track your expenses and transaction history manually 
    when you can let us do it for you`,
    icon: "/landing/manual-tracking.png",
  },
  {
    title: "User only access",
    desc: `Imagine a world where only you have access to your financial data, no third party on MyFi.`,
    icon: "/landing/user-only-access.png",
  },
  {
    title: "Easy to use",
    desc: `Our user experience is smooth and very easy for every user to understand how it works`,
    icon: "/landing/easy-to-use.png",
  },
];
