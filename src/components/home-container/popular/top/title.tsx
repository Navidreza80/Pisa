import { getTranslations } from "next-intl/server";
import React from "react";

async function Top() {
  const t = await getTranslations("HomePage");
  return (
    <div className="text-right text-[28px] font-[700]">
      {t.rich("rentTitle", {
        br: () => <br />,
      })}
    </div>
  );
}

export default Top;
