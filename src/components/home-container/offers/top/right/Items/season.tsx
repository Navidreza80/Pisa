import { getTranslations } from 'next-intl/server'
import React from 'react'

async function Season() {
    const t = await getTranslations('HomePage')
    return (
        <div className='bg-[#FF5454] p-[8px] rounded-[16px] rotate-[-13.08deg] '>
            <p className='my-0 text-white text-[28px] font-bold'>{t('spring')}</p>
        </div>
    )
}

export default Season
