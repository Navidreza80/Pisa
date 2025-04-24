import { getTranslations } from "next-intl/server";
import React from "react";

async function Title() {
  const t = await getTranslations("HomePage");
  return (
    <div className="font-bold text-right text-[28px]">
      {t.rich("hot", {
        br: () => <br />,
      })}
    </div>
  );
}

export default Title;
