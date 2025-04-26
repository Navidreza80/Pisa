// Third party components
import Button from "@/components/common/button/button";
// API
import { getAllHouse } from "@/utils/service/house/get-all-house";
// Change lang
import TopSaleCardList from "@/components/home-container/topSale/TopSaleCardList";
import { getTranslations } from "next-intl/server";

export default async function TopSales() {
  const t = await getTranslations("HomePage");
  const data = await getAllHouse(1, 3, "rate", "DESC", "", "");
  return (
    <div>
      <div className="flex justify-between items-center mb-[32px]">
        <Button>{t("seeMore")}</Button>
        <div className="flex flex-row-reverse gap-[20px]">
          <div className="font-bold text-right text-[28px]">
            {t.rich("hot", {
              br: () => <br />,
            })}
          </div>
        </div>
      </div>
      <TopSaleCardList data={data} />
    </div>
  );
}
