import { useTranslations } from "next-intl";

const OurServicesSection = () => {
  // Hooks
  const t = useTranslations("AboutUs");
  const ourServices = [
    { id: 1, text: t("servicesDesc1") },
    { id: 2, text: t("servicesDesc2") },
    { id: 3, text: t("servicesDesc3") },
  ];
  return (
    <div className="mt-16 p-8 rounded-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {t("realEstateServices")}
      </h2>
      {ourServices.map((item) => (
        <p key={item.id} className="mb-6 text-center leading-relaxed">
          {item.text}
        </p>
      ))}
    </div>
  );
};
export default OurServicesSection;
