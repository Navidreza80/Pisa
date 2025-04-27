import Button from "@/components/common/button/button";
import HouseCardList from "@/components/common/house/HouseCardList";
import { HouseItemsInterface } from "@/types/house";
import { getTranslations } from "next-intl/server";

async function Offers({ data }) {
  const cardData = [
    {
      id: 1,
      title: "آپارتمان لوکس زعفرانیه",
      Location: "تهران, زعفرانیه",
      imageUrl:
        "https://memarankarina.com/wp-content/uploads/2020/04/%D8%B7%D8%B1%D8%A7%D8%AD%DB%8C-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%DA%A9%D9%88%D8%B1%D8%A7%D8%B3%DB%8C%D9%88%D9%86-%D8%AF%D8%A7%D8%AE%D9%84%DB%8C-4.jpg",
      bathroom: 2,
      person: 4,
      room: 2,
      offer: 15,
      price: 2500000,
    },
    {
      id: 2,
      title: "آپارتمان لوکس زعفرانیه",
      Location: "تهران, زعفرانیه",
      imageUrl:
        "https://memarankarina.com/wp-content/uploads/2020/04/%D8%B7%D8%B1%D8%A7%D8%AD%DB%8C-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%DA%A9%D9%88%D8%B1%D8%A7%D8%B3%DB%8C%D9%88%D9%86-%D8%AF%D8%A7%D8%AE%D9%84%DB%8C-4.jpg",
      bathroom: 2,
      person: 4,
      room: 2,
      offer: 15,
      price: 2500000,
    },
    {
      id: 3,
      title: "آپارتمان لوکس زعفرانیه ",
      Location: "تهران, زعفرانیه",
      imageUrl:
        "https://memarankarina.com/wp-content/uploads/2020/04/%D8%B7%D8%B1%D8%A7%D8%AD%DB%8C-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%DA%A9%D9%88%D8%B1%D8%A7%D8%B3%DB%8C%D9%88%D9%86-%D8%AF%D8%A7%D8%AE%D9%84%DB%8C-4.jpg",
      bathroom: 2,
      person: 4,
      room: 2,
      offer: 15,
      price: 2500000,
    },
  ];
  const t = await getTranslations("HomePage");
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-[32px]">
        <Button>{t("seeMore")}</Button>
        <div className="flex flex-row-reverse gap-[20px]">
          <div className="font-bold text-[28px]">{t("offer")}</div>
          <div className="bg-[#FF5454] hidden lg:block md:block rounded-[16px] animate-[var(--animation-fall)] [animation-timeline:view(), 1s] ">
            <p className="my-0 text-white text-[28px] p-[8px] w-[74px] text-center h-[52px] flex items-center font-bold fallAnimation">
              {t("spring")}
            </p>
          </div>
          <div className="bg-[#FF5454] py-[12px] px-[16px] hidden lg:flex md:flex rounded-[16px] h-[50px] flex-row-reverse gap-[8px] font-yekannum">
            <h1 className="my-auto text-white text-[20px] font-[600]">
              2:20:25
            </h1>
            <svg
              className="my-auto"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 12H12V6"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.8475 4.17041C19.0217 4.3242 19.1911 4.48354 19.3555 4.648C19.5199 4.81246 19.6791 4.98203 19.8328 5.15629M15 2C15.4821 2.14255 15.9548 2.32634 16.4134 2.54664M21.4375 7.55457C21.6647 8.02313 21.8539 8.50663 22 9"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex gap-[30px] justify-center md:justify-center lg:justify-between flex-wrap">
        {data.map((card: HouseItemsInterface, index: number) => (
          <HouseCardList
            key={index}
            discount
            showRooms
            showBathrooms
            showParking
            showCapacity
            card={card}
          />
        ))}
      </div>
    </div>
  );
}

export default Offers;
