import { getTranslations } from 'next-intl/server'
import React from 'react'

async function Season() {
    const t = await getTranslations('HomePage')
    return (
        <div className='bg-[#FF5454] hidden lg:block md:block rounded-[16px] animate-[var(--animation-fall)] [animation-timeline:view(), 1s] '>
            <p className='my-0 text-white text-[28px] p-[8px] w-[74px] text-center h-[52px] flex items-center font-bold fallAnimation'>{t('spring')}</p>
        </div>
    )
}

export default Season
