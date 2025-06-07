import elmira from "@/assets/images/about-us/elmira.jpg";
import navid from "@/assets/images/about-us/navid.jpg";
import taha from "@/assets/images/about-us/taha.jpg";
import { useTranslations } from "next-intl";
import MemberCard from "../content/MemberCard";
import Mentor from "../content/Mentor";

const TeamMemberSection = () => {
  // Hooks
  const t = useTranslations("AboutUs");

  // Members
  const Members = [
    { name: t("navid"), job: t("frontendDeveloper"), profile: navid.src },
    { name: t("taha"), job: t("frontendDeveloper"), profile: taha.src },
    { name: t("elmira"), job: t("frontendDeveloper"), profile: elmira.src },
  ];
  return (
    <div className="mb-20">
      {/* Mentor section */}
      <Mentor />
      {/* Our team section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Members.map((item, index) => (
          <MemberCard
            key={index}
            name={item.name}
            job={item.job}
            profile={item.profile}
          />
        ))}
      </div>
    </div>
  );
};
export default TeamMemberSection;
