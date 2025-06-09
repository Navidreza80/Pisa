import React from "react";
import ProfileCard from "./ProfileCard";
import IncomeCard from "./IncomeCard";

const TagDashboard = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap justify-between md:h-[255px] h-auto md:gap-y-0 gap-y-5">
      {data.map((card, index) => {
        if (card.type === "profile") {
          return <ProfileCard key={index} data={card.data} />;
        }
        if (card.type === "income") {
          return <IncomeCard key={index} data={card.data} title={card.title} />;
        }
        return null;
      })}
    </div>
  );
};

export default TagDashboard;
