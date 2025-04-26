import { getTranslations } from "next-intl/server";

export default async function OrUnderline() {
  const t = await getTranslations("Auth");
  return (
    <div className="flex justify-between max-[600px]:w-[100%] items-center">
      <span className="bg-[#F0F0F0] dark:bg-[#444] h-[1px] max-[1300px]:w-[90%] w-[182px]"></span>
      <p className="text-[#000] dark:text-white text-[14px] mx-2">{t("Or")}</p>
      <span className="bg-[#F0F0F0] dark:bg-[#444] h-[1px] max-[1300px]:w-[90%] w-[182px]"></span>
    </div>
  );
}
