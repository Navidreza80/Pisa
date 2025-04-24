import { getTranslations } from "next-intl/server";
import React from "react";

async function Title() {
  const t = await getTranslations("HomePage");
  return (
    <div className="flex justify-end">
      <h1 className="text-text dark:text-text-dark w-[274px] text-right font-[700] text-[28px]">
        {t.rich("rank", {
          br: () => <br />,
        })}
      </h1>
    </div>
  );
}

export default Title;
