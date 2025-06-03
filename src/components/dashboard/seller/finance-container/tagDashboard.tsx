import React from "react";
import ProfileCard from "./ProfileCard";
import IncomeCard from "./IncomeCard";

const TagDashboard = ({ data }) => {
  return (
    <div className="w-full flex justify-between h-[255px]">
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
