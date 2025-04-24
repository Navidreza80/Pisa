import { getTranslations } from "next-intl/server";
import React from "react";

async function Left() {
  const t = await getTranslations("HomePage");
  return (
    <div className="text-white rounded-2xl bg-[#586CFF] py-[16px] px-[9px]">
      {t("seeMore")}
    </div>
  );
}

export default Left;
