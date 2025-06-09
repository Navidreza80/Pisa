import { useTranslations } from "next-intl";
import Question from "../content/Question";

const FaqSection = () => {
  const t = useTranslations("AboutUs");
  return (
    <div className="mt-24 mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">
        {t("faq")}
      </h2>
      <div className="space-y-6">
        <Question title={t("faq1Question")} desc={t("faq1Answer")} />
        <Question title={t("faq2Question")} desc={t("faq2Answer")} />
        <Question title={t("faq3Question")} desc={t("faq3Answer")} />
      </div>
    </div>
  );
};
export default FaqSection;
