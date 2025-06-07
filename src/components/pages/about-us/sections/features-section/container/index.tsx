import { useTranslations } from "next-intl";
import Features from "../content/Features";
import { Box, HandshakeIcon, Star } from "lucide-react";

const FeaturesSection = () => {
  const t = useTranslations("AboutUs");
  const baseCLX = "text-primary";
  const featureItems = [
    {
      id: 1,
      title: t("quality"),
      desc: t("qualityDesc"),
      icon: <Box className={baseCLX} />,
    },
    {
      id: 2,
      title: t("innovation"),
      desc: t("innovationDesc"),
      icon: <Star className={baseCLX} />,
    },
    {
      id: 3,
      title: t("collaboration"),
      desc: t("collaborationDesc"),
      icon: <HandshakeIcon className={baseCLX} />,
    },
  ];
  return (
    <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
      {featureItems.map((item) => (
        <Features
          key={item.id}
          title={item.title}
          desc={item.desc}
          icon={item.icon}
        />
      ))}
    </div>
  );
};
export default FeaturesSection;
