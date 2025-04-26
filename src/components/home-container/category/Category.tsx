// Images
import aparteman from "@/assets/images/landing/category/aparteman.png";
import estakhr from "@/assets/images/landing/category/estakhr.png";
import kolbe from "@/assets/images/landing/category/kolbei.png";
import Villa from "@/assets/images/landing/category/vilaii.png";
import getAllCategories from "@/utils/service/categories/categories";
// Change lang
import { getTranslations } from "next-intl/server";

export default async function Category() {
  const categories = await getAllCategories();
  const t = await getTranslations("HomePage");
  return (
    <div>
      <div className="text-right text-[28px] font-[700]">{t("category")}</div>
      <div className="container mx-auto p-4">
        <div className="flex grow flex-wrap justify-center md:justify-center lg:justify-between gap-6 mb-6">
          {categories.map((card, index) => (
            <div
              key={card.id}
              className={`flex-1 transition-all duration-500 ease-in-out bg-black relative rounded-[20px] overflow-hidden ${
                categories.length == 4 && index == 3
                  ? "max-h-[300px]"
                  : "max-h-[190px]"
              } min-w-[calc(33.3%-24px)] group`}
            >
              <img
                src={
                  card.name == "ویلا"
                    ? Villa.src
                    : card.name == "مسکونی"
                    ? estakhr.src
                    : card.name == "آپارتمان"
                    ? aparteman.src
                    : kolbe.src
                }
                alt={card.name}
                className="w-full h-full rounded-[20px] object-cover opacity-75
                transition-all duration-500 ease-in-out 
                group-hover:opacity-60 group-hover:scale-110"
              />
              <div className="p-4 text-center absolute inset-0 flex items-end justify-end">
                <p
                  className="text-lg text-[24px] font-[700] text-white 
                   transition-all duration-500 ease-in-out
                   group-hover:translate-y-[-10px]"
                >
                  {card.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
