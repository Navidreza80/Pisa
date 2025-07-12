// Next
import Image from "next/image";

// Dependencies
import { getTranslations } from "next-intl/server";

// Icons
import icon1 from "../../../assets/images/footer/e-namad.png";
import icon2 from "../../../assets/images/footer/etemad.png";
import icon3 from "../../../assets/images/footer/e-box.png";

// SVGs
import LogoSVG from "../svg/logo";

// Third party components
import ContactForm from "./contact-form";
import FooterColumn from "./footer-column";
import Container from "../container";

/**
 * Footer component for page footer.
 * 
 * @component
 * @returns {JSX.Element} - Rendered footer
 */

export default async function Footer() {
  // Hooks
  const t = await getTranslations("HomePage");

  // Footer columns data
  const footerColumns = [
    {
      title: t("footerColumns.title1"),
      items: [
        { text: t("footerColumns.col1"), className: "mb-2" },
        { text: "Delta@gmail.com", className: "mb-4" },
        {
          text: t("footerColumns.col2"),
          className: "mb-1",
        },
        { text: t("footerColumns.col3"), className: "" },
      ],
    },
    {
      title: t("footerColumns.title2"),
      items: [
        { text: t("footerColumns.col4"), className: "mb-2" },
        { text: t("footerColumns.col5"), className: "mb-2" },
        { text: t("footerColumns.col6"), className: "mb-2" },
        { text: t("footerColumns.col7"), className: "" },
      ],
    },
    {
      title: t("footerColumns.title3"),
      items: [
        { text: t("footerColumns.col8"), className: "mb-2", highlight: true },
        { text: t("footerColumns.col9"), className: "mb-2" },
        { text: t("footerColumns.col10"), className: "" },
      ],
    },
  ];

  return (
    <Container>
      <div className="border-t w-[85.5%] items-start border-text my-10 flex flex-col py-10">
        <div className="flex mb-10">
          <LogoSVG size="w-[106px] h-[36px]" />
        </div>
        <div className="flex flex-col items-start md:flex-row justify-between gap-8 md:gap-16">
          {footerColumns.map((column, index) => (
            <FooterColumn
              key={`column-${index}`}
              title={column.title}
              items={column.items}
            />
          ))}

          <div className="flex flex-col md:w-auto lg:max-w-md">
            <p className="text-text leading-6   mb-5">
              {t("footerAbout")}
            </p>
          </div>
        </div>
        <div className="my-8 w-full">
          <ContactForm />
        </div>
        <div className="flex flex-wrap gap-10 justify-end items-center mt-4">
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
    </Container>
  );
}
