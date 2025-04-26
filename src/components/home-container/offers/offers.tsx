import Button from "@/components/common/button/button";
import { getTranslations } from "next-intl/server";

async function Offers() {
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
      <div className="flex justify-center md:justify-center lg:justify-between flex-wrap gap-[30px]">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="flex flex-col flex-wrap lg:justify-between md:justify-center justify-center border-[1px] min-w-[391px] w-[calc(33.3%-20px)] p-[16px] rounded-[40px] h-[438px] border-border dark:border-border-dark "
          >
            <img
              className="w-full h-[221px] rounded-b-[16px] rounded-t-[24px]"
              src={card.imageUrl}
              alt=""
            />
            <h1 className="font-[600] text-right text-[20px] text-text ">
              {card.title}
            </h1>
            <div className="flex justify-end gap-[5px]">
              <h1 className="text-right font-[500] text-[14px] text-text-secondary  ">
                {card.Location}
              </h1>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 10V9.21749C22 7.27787 22 6.30807 21.4142 5.7055C20.8284 5.10294 19.8856 5.10294 18 5.10294H15.9214C15.004 5.10294 14.9964 5.10116 14.1715 4.68834L10.8399 3.02114C9.44884 2.32504 8.75332 1.97699 8.01238 2.00118C7.27143 2.02537 6.59877 2.41808 5.25345 3.20351L4.02558 3.92037C3.03739 4.49729 2.54329 4.78576 2.27164 5.26564C2 5.74553 2 6.32993 2 7.49873V15.7157C2 17.2514 2 18.0193 2.34226 18.4467C2.57001 18.731 2.88916 18.9222 3.242 18.9856C3.77226 19.0808 4.42148 18.7018 5.71987 17.9437C6.60156 17.429 7.45011 16.8944 8.50487 17.0394C9.38869 17.1608 10.21 17.7185 11 18.1138"
                  stroke="#595959"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 2V17"
                  stroke="#595959"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 5V9.5"
                  stroke="#595959"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.3083 21.6835C18.0915 21.8865 17.8017 22 17.5001 22C17.1985 22 16.9087 21.8865 16.6919 21.6835C14.7063 19.813 12.0455 17.7235 13.3431 14.6898C14.0447 13.0496 15.7289 12 17.5001 12C19.2713 12 20.9555 13.0496 21.6571 14.6898C22.9531 17.7196 20.2988 19.8194 18.3083 21.6835Z"
                  stroke="#595959"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.5 16.5H17.509"
                  stroke="#595959"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="bg-border  h-[1px]"></div>
            <div className="flex flex-row-reverse justify-start gap-[16px]">
              <div className="flex flex-row-reverse gap-[5px]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 17.5H2"
                    stroke="#595959"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21"
                    stroke="#595959"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12"
                    stroke="#595959"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 12V9C3 7.58579 3 6.87868 3.43934 6.43934C3.87868 6 4.58579 6 6 6C6.27475 6 6.65685 6.07272 6.90282 5.94012C7.0139 5.88025 7.11349 5.72888 7.31269 5.42616C8.26921 3.97247 10.2246 3 12 3C13.7754 3 15.7308 3.97247 16.6873 5.42616C16.8865 5.72888 16.9861 5.88025 17.0972 5.94012C17.3432 6.07272 17.7252 6 18 6C19.4142 6 20.1213 6 20.5607 6.43934C21 6.87868 21 7.58579 21 9V12"
                    stroke="#595959"
                    strokeWidth="1.5"
                  />
                </svg>

                <div className="flex flex-row-reverse gap-[3px]">
                  <h1 className="font-yekannum">{card.room}</h1>
                  <h1>خواب</h1>
                </div>
              </div>
              <div className="bg-border  w-[1px]" />
              <div className="flex flex-row-reverse gap-[5px]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 20L5 21M18 20L19 21"
                    stroke="#595959"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12"
                    stroke="#595959"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12H22"
                    stroke="#595959"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5"
                    stroke="#595959"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 6L10.5 4"
                    stroke="#595959"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="flex flex-row-reverse gap-[3px]">
                  <h1 className="font-yekannum">{card.bathroom}</h1>
                  <h1>حمام</h1>
                </div>
              </div>
              <div className="bg-border  w-[1px]" />
              <div className="flex flex-row-reverse gap-[5px]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.4995 20V16.5C20.5856 16.5 21.1991 16.5 21.4186 16.0257C21.6381 15.5515 21.3953 14.9028 20.9095 13.6056L19.6676 10.2889C19.2571 9.19253 18.4179 8.5 17.5 8.5C16.5821 8.5 15.7429 9.19253 15.3324 10.2889L14.0905 13.6056C13.6047 14.9028 13.3619 15.5515 13.5814 16.0257C13.8009 16.5 14.4133 16.5 15.4995 16.5V20C15.4995 20.9428 15.4995 21.4142 15.7924 21.7071C16.0853 22 16.5567 22 17.4995 22C18.4423 22 18.9137 22 19.2066 21.7071C19.4995 21.4142 19.4995 20.9428 19.4995 20Z"
                    stroke="#595959"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 4C8.5 5.10457 7.60457 6 6.5 6C5.39543 6 4.5 5.10457 4.5 4C4.5 2.89543 5.39543 2 6.5 2C7.60457 2 8.5 2.89543 8.5 4Z"
                    stroke="#595959"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.5 4C19.5 5.10457 18.6046 6 17.5 6C16.3954 6 15.5 5.10457 15.5 4C15.5 2.89543 16.3954 2 17.5 2C18.6046 2 19.5 2.89543 19.5 4Z"
                    stroke="#595959"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.5 12.5C10.5 10.6144 10.5 9.67157 9.91421 9.08579C9.32843 8.5 8.38562 8.5 6.5 8.5C4.61438 8.5 3.67157 8.5 3.08579 9.08579C2.5 9.67157 2.5 10.6144 2.5 12.5V14.5C2.5 15.4428 2.5 15.9142 2.79289 16.2071C3.08579 16.5 3.55719 16.5 4.5 16.5V20C4.5 20.9428 4.5 21.4142 4.79289 21.7071C5.08579 22 5.55719 22 6.5 22C7.44281 22 7.91421 22 8.20711 21.7071C8.5 21.4142 8.5 20.9428 8.5 20V16.5C9.44281 16.5 9.91421 16.5 10.2071 16.2071C10.5 15.9142 10.5 15.4428 10.5 14.5V12.5Z"
                    stroke="#595959"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="flex flex-row-reverse gap-[3px]">
                  <h1 className="font-yekannum">{card.person}</h1>
                  <h1>نفر</h1>
                </div>
              </div>
            </div>
            <div className="flex flex-row-reverse gap-[10px]">
              <div className="relative opacity-[0.5]">
                <div className="flex flex-row-reverse gap-[5px] ">
                  <h1 className="text-[20px] font-[700] my-auto font-yekannum">
                    {card.price}
                  </h1>
                  <p className="text-[12px] font-[700] my-auto text-text-secondary ">
                    تومان
                  </p>
                </div>

                <div className="bg-[#FF5555] top-[17px] absolute w-[100%] h-[2px] rotate-[-9.3deg]"></div>
              </div>
              <p className="text-[16px] font-[700] my-auto">/</p>
              <div className="flex flex-row-reverse gap-[5px]">
                <h1 className="text-[20px] font-[700] my-auto font-yekannum">
                  {card.offer}
                </h1>
                <p className="text-[12px] font-[700] my-auto text-text-secondary ">
                  تومان
                </p>
              </div>
              <div className="bg-[#FF5555] rounded-[100px] flex flex-row-reverse gap-[2px] px-[12px] py-[5px] ">
                <h1 className="text-white text-[16px] font-[700] font-yekannum">
                  {card.offer}
                </h1>
                <h1 className="text-white text-[16px] font-[700]">%</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offers;
