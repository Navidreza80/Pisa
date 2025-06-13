// API
import getAllCategories from "@/utils/service/categories/categories";

// Dependencies
import { getTranslations } from "next-intl/server";

// Third party components
import CategoryImage from "../content/CategoryImage";
import Reveal from "@/components/common/reveal";

/**
 * Category component.
 * When clicked, the reservation houses filter based on property type.
 * User goes to /reserve
 *
 * @component
 * @returns {JSX.Element} - Rendered category
 */

export default async function Category() {
  // Fetch data
  const categories = await getAllCategories({ page: 1, limit: 6 });
  // Hooks
  const t = await getTranslations("HomePage");
  return (
    <div dir="rtl">
      <Reveal>
        <div className="text-right text-[28px] font-[700]">{t("category")}</div>
      </Reveal>
      <div className="container mx-auto p-4">
        <div className="flex grow flex-wrap justify-center md:justify-center lg:justify-between gap-6 mb-6">
          {(categories as Array<{ id: string; name: string }>).data.map(
            (card, index) => (
              <div
                key={card.id}
                className={`flex-1 transition-all ease-in-out bg-black relative rounded-4xl overflow-hidden ${
                  (categories as Array<{ id: string; name: string }>).length ===
                    4 && index === 3
                    ? "max-h-[300px]"
                    : "max-h-[190px]"
                } min-w-[calc(33.3%-24px)] group`}
              >
                <CategoryImage id={card.id} name={card.name} />
                <div className="p-4 text-center absolute right-0 bottom-1 flex items-end justify-end">
                  <Reveal className="w-full">
                    <p
                      className="text-lg text-[24px] font-[700] text-right w-full text-white 
                   transition-all duration-500 ease-in-out relative z-30"
                    >
                      {card.name}
                    </p>
                  </Reveal>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
