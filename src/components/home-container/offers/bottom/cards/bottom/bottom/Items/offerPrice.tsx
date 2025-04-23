import React from 'react'

interface OfferPriceProps{
    offerPrice: number;
}
function OfferPrice({offerPrice}:OfferPriceProps) {
    return (
        <div className='flex flex-row-reverse gap-[5px]'>
            <h1 className='text-[20px] font-[700] my-auto'>{offerPrice}</h1>
            <p className='text-[12px] text-[#595959] font-[700] my-auto'>تومان</p>
        </div>
    )
}

export default OfferPrice