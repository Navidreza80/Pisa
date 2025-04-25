// Change lang
import { getTranslations } from "next-intl/server";

export default async function LoginBtn() {
  const t = await getTranslations('Header');
  return (
    <button className="py-3.5 px-4 w-auto  min-w-[129px] bg-[#586CFF] rounded-xl text-white text-center max-[600px]:py-4 max-[600px]:px-5">
      {t("login")}
    </button>
  );
}
