import { getTranslations } from 'next-intl/server'
import React from 'react'

export default async function Title() {
  const t = await getTranslations('HomePage')
  return (
    <div className='font-bold text-[28px]'>{t('offer')}</div>
  )
}