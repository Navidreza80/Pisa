"use client";
import InputText from "@/components/common/inputs/text-input-with-label";
import { useTranslations } from 'next-intl';

const AddPropertyStepFour = ({ photoURL, handleChange }) => {
  const t = useTranslations('AddPropertyStepFour');

  return (
    <div className="mt-8 flex flex-col justify-center items-center">
      <div className="flex flex-row-reverse justify-start flex-wrap text-[20px] font-bold w-full">
        <h1 className="text-base font-medium mb-[19px] w-full text-text-secondary">
          {t('title')}
        </h1>
        <h2 className="text-primary">{t('subtitle1')}</h2>
        <h2 className="text-text font-semibold">
          {t('subtitle2')}
        </h2>
      </div>
      <div
        className="mt-[81px] grid grid-cols-2 gap-[30px] justify-center"
      >
        {photoURL.map((val, i) => (
          <InputText
            key={i}
            label={t('imageLinkLabel')}
            value={val}
            onChange={(e) => handleChange(i, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default AddPropertyStepFour;