import React from 'react'

interface OfferPriceProps{
    offerPrice: number;
}
function OfferPrice({offerPrice}:OfferPriceProps) {
    return (
        <div className='flex flex-row-reverse gap-[5px]'>
            <h1 className='text-[20px] font-[700] my-auto font-yekannum'>{offerPrice}</h1>
            <p className='text-[12px] font-[700] my-auto'>تومان</p>
        </div>
    )
}

export default OfferPrice