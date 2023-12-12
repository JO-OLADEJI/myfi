export const SectionThree = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div>
        <p className=" text-center text-neutral-800 text-[45px] font-bold ">
          Fully Decentralized.
          <br />
          Completely Secure.
        </p>
        <p className=" text-center text-neutral-500 text-[22px] font-normal  leading-[34px]">
          You can have all your accounts synced
          <br />
          for better management.
        </p>
      </div>
      <div>
        {cards.map((card, index) => (
          <div key={index} className="flex-col rounded-lg shadow-lg">
            <img src={card.icon} alt={card.title} />
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
];
