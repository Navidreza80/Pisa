import Close from "../common/svg/close";
import { useTranslations } from "next-intl";

const CloseBtn = ({ onClick }) => {
  const t = useTranslations('FilterModal');

  return (
    <button
      onClick={onClick}
      className="w-[119px] cursor-pointer hover:border-[#ff4242e1] hover:text-[#ff4242e5] hover:scale-105 transition-all duration-300 h-12 rounded-[64px] border border-[#FF4242] text-[#FF4242] font-semibold flex items-center justify-center gap-2"
      aria-label={t('close')}
    >
      <Close />
      {t('close')}
    </button>
  );
};

export default CloseBtn;
