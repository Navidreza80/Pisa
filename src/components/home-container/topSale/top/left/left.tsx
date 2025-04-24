import { getTranslations } from 'next-intl/server'
import React from 'react'

async function Left() {
  const t = await getTranslations('HomePage')
  return (
    <div className='text-white my-[auto] h-[48px] flex justify-center items-center rounded-2xl bg-[#586CFF]  px-[12px]'>{t('seeMore')}</div>
  )
}

export default Left