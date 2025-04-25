import { getTranslations } from "next-intl/server";
import React from "react";

async function Left() {
  const t = await getTranslations("HomePage");
  return (
    <div className="text-white rounded-2xl h-[48px] bg-[#586CFF] px-[16px] py-[9px] flex items-center">
      {t("seeMore")}
    </div>
  );
}

export default Left;
