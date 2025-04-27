// Next built in
import Image from "next/image";
// Icons
import icon1 from "../../../assets/images/footer/e-namad.png";
import icon2 from "../../../assets/images/footer/etemad.png";
import icon3 from "../../../assets/images/footer/e-box.png";
// Change lang
import { getTranslations } from "next-intl/server";
import LogoSVG from "../svg/logo";
import ContactForm from "./contact-form";

export default async function Footer() {
  const t = await getTranslations("HomePage");
  // Contact info data
  const contactInfo = [
    { text: "۰۲۱۲۳۴۵۶۷۸۹ - ۰۹۱۲۳۴۵۶۷۸۹", className: "mb-2" },
    { text: "Delta@gmail.com", className: "mb-4" },
    {
      text: "گیلان، رشت، میدان آزادی، جنب چهار راه علی آباد",
      className: "mb-1",
    },
    { text: "زاهد", className: "" },
  ];

  // Customer services data
  const customerServices = [
    { text: "پرسش های متداول مهمان", className: "mb-2" },
    { text: "پرسش های متداول میزبان", className: "mb-2" },
    { text: "چطور اقامتگاه ثبت کنم؟", className: "mb-2" },
    { text: "حریم شخصی کاربران", className: "" },
  ];

  // How to use data
  const howToUse = [
    { text: "راهنمای رزرو اقامتگاه", className: "mb-2" },
    { text: "شیوه پرداخت", className: "mb-2" },
    { text: "نحو رزرو اقامتگاه", className: "" },
  ];

  return (
    <div className="w-full border-t border-border  my-10 flex flex-col py-10">
      <div className="flex justify-end mb-10">
        <LogoSVG width={106} height={36} />
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-16">
        {/* Column 1 - Contact Info */}
        <div className="flex flex-col items-end">
          <h3 className="font-bold mb-4 text-text  text-right">
            راه ارتباطی دلتا
          </h3>
          {contactInfo.map((item, index) => (
            <p
              key={`contact-${index}`}
              className={`text-text-secondary   text-right ${item.className}`}
            >
              {item.text}
            </p>
          ))}
        </div>

        {/* Column 2 - Customer Services */}
        <div className="flex flex-col items-end">
          <h3 className="font-bold mb-4 text-text   text-right">
            خدمات مشتریان
          </h3>
          {customerServices.map((item, index) => (
            <p
              key={`service-${index}`}
              className={` text-right text-text-secondary  ${item.className}`}
            >
              {item.text}
            </p>
          ))}
        </div>

        {/* Column 3 - How to Use */}
        <div className="flex flex-col items-end">
          <h3 className="font-bold mb-4 text-right text-text ">
            نحوه رزرو اقامتگاه
          </h3>
          {howToUse.map((item, index) => (
            <p
              key={`howto-${index}`}
              className={` text-right ${item.className} ${
                index == 0
                  ? "text-[#1E1E1E] dark:text-[#c8c8c8]"
                  : "text-text-secondary "
              }`}
            >
              {item.text}
            </p>
          ))}
        </div>

        {/* Column 4 - About */}
        <div className="flex flex-col items-end md:w-auto lg:max-w-md">
          <p className="text-text  leading-6 text-right mb-5">
            {t("footerAbout")}
          </p>
        </div>
      </div>
      <div>
        <ContactForm />
      </div>
      <div className="flex flex-wrap gap-10 justify-end items-center">
        <div className="w-[56px] h-[56px] bg-[#232323] rounded-2xl flex justify-center items-center">
          <Image src={icon1} width={56} height={56} alt="e-namad" />
        </div>
        <div className="w-[56px] h-[56px] bg-[#232323] rounded-2xl flex justify-center items-center">
          <Image src={icon2} width={45} height={45} alt="trust" />
        </div>
        <div className="w-[56px] h-[56px] rounded-2xl flex justify-center items-center">
          <Image src={icon3} width={56} height={56} alt="trust" />
        </div>
      </div>
    </div>
  );
}
