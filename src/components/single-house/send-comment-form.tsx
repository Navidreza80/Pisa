import { Input } from "@/components/ui/input";
import SectionName from "./section-name";
import { getTranslations } from "next-intl/server";

export default async function SendComment() {
  const t = await getTranslations("SingleHouse");
  return (
    <div className="mt-14 flex flex-col gap-3">
      <SectionName sectionName={t("userComments")} />
      <Input
        className="border-border h-[102px] px-4 py-6 placeholder:text-text-secondary items-start rounded-3xl"
        dir="rtl"
        placeholder={t("commentPlaceholder")}
      />
      <button className="bg-primary w-full rounded-full h-12 mt-1 text-white">
        {t("send")}
      </button>
    </div>
  );
}
