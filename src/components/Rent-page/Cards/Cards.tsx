import HouseCardList from "@/components/common/house/HouseCardList";
import { HouseItemsInterface } from "@/types/house";
import { getAllHouse } from "@/utils/service/house/get-all-house";
import { getServerCookie } from "@/utils/service/storage/server-cookie";
import { jwtDecode } from "jwt-decode";
import React from "react";

async function Cards() {
  const data = await getAllHouse(1, 12, "", "", "", "", "", "", "");
  const token = await getServerCookie("serverAccessToken");
  const { id: userId } =
    typeof token === "string" ? jwtDecode(token) : { id: null };

  return (
    <div className="flex justify-between flex-wrap">
      {data.map((card: HouseItemsInterface, index: number) => (
        <HouseCardList
          userId={userId}
          key={index}
          discount
          showRooms
          showBathrooms
          showParking
          card={card}
          setCurrentLoc={[]}
        />
      ))}
    </div>
  );
}

export default Cards;
