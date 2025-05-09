// API
import getAllCategories from "@/utils/service/categories/categories";

// Dependencies
import { getTranslations } from "next-intl/server";

// Third party components
import CategoryImage from "./category-image";

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
  const categories = await getAllCategories();
  // Hooks
  const t = await getTranslations("HomePage");
  return (
    <div>
      <div className="text-right text-[28px] font-[700]">{t("category")}</div>
      <div className="container mx-auto p-4">
        <div className="flex grow flex-wrap justify-center md:justify-center lg:justify-between gap-6 mb-6">
          {(categories as Array<{ id: string; name: string }>).map(
            (card, index) => (
              <div
                key={card.id}
                className={`flex-1 transition-all duration-500 ease-in-out bg-black relative rounded-[20px] overflow-hidden ${
                  (categories as Array<{ id: string; name: string }>).length ===
                    4 && index === 3
                    ? "max-h-[300px]"
                    : "max-h-[190px]"
                } min-w-[calc(33.3%-24px)] group`}
              >
                <CategoryImage name={card.name} />
                <div className="p-4 text-center absolute inset-0 flex items-end justify-end">
                  <p
                    className="text-lg text-[24px] font-[700] text-white 
                   transition-all duration-500 ease-in-out relative z-30
                   group-hover:translate-y-[-10px]"
                  >
                    {card.name}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
