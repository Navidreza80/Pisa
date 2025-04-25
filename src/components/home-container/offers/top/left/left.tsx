import Button from "@/components/common/button/button";
import { getTranslations } from "next-intl/server";
import React from "react";

async function Left() {
  const t = await getTranslations("HomePage");
  return (
    <Button>
      {t("seeMore")}
    </Button>
  );
}

export default Left;
