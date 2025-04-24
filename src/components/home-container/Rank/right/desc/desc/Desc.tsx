import { getTranslations } from 'next-intl/server';
import React from 'react'

async function DescBottom() {
  const t = await getTranslations("HomePage");
  return (
    <div>
        <p className='max-w-[451px] text-right text-[16px} text-[#2C2C2C] font-[700] text-text-secondary dark:text-text-secondary-dark'>{t('rankDesc')}</p>
    </div>
  )
}

export default DescBottom