"use client";

import ProfileCard from "./ProfileCard";
import IncomeCard from "./IncomeCard";
import ReservationChart from "./ReservationChart"

const TagDashboard = ({ data }) => {
  return data.map((card, index) => {
    if (card.type === "profile") {
      return <ProfileCard key={index} data={card.data} />;
    }
    if (card.type === "income") {
      return <IncomeCard key={index} data={card.data} title={card.title} />;
    }
    if (card.type === "reservation") {
      return <ReservationChart key={index} data={card.data} title={card.title} />;
    }
    return null;
  });
};

export default TagDashboard;
