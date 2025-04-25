// Images
import aparteman from "@/assets/images/landing/category/aparteman.png";
import bomgardi from "@/assets/images/landing/category/bomgardi.png";
import estakhr from "@/assets/images/landing/category/estakhr.png";
import kolbe from "@/assets/images/landing/category/kolbei.png";
import sahel from "@/assets/images/landing/category/saheli.png";
import Villa from "@/assets/images/landing/category/vilaii.png";
// Change lang
import { getTranslations } from "next-intl/server";

async function Category() {
  const cardData = [
    { id: 1, name: "آپارتمانی", image: aparteman },
    { id: 2, name: "ساحلی", image: sahel },
    { id: 3, name: "استخردار", image: estakhr },
    { id: 4, name: "کلبه ای", image: kolbe },
    { id: 5, name: "بومگردی", image: bomgardi },
    { id: 6, name: "ویلایی", image: Villa },
  ];
  const t = await getTranslations("HomePage");
  return (
    <div>
      <div className="text-right text-[28px] font-[700]">{t("category")}</div>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-center md:justify-center lg:justify-between gap-6 mb-6">
          {cardData.slice(0, 6).map((card) => (
            <div
              key={card.id}
              className="flex-1 hover:scale-[1.1] transition-transform duration-300 bg-black relative rounded-[20px] max-h-[190px] min-w-[389px] max-w-[389px]"
            >
              <img
                src={card.image.src}
                alt={card.name}
                className="w-full  opacity-[0.8] h-full rounded-[20px] bg-cover"
              />
              <div className="p-4 text-center">
                <p className="text-lg  absolute bottom-[5%] right-[5%] text-[24px] font-[700] text-white">
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

export default Category;
