import React from 'react'

interface OfferProps{
    offer: number;
}
function Offer({offer}:OfferProps) {
  return (
    <div className='bg-[#FF5555] rounded-[100px] flex flex-row-reverse gap-[2px] px-[12px] py-[5px] '>
        <h1 className='text-white text-[16px] font-[700] font-yekannum'>{offer}</h1>
        <h1 className='text-white text-[16px] font-[700]'>%</h1>
    </div>
  )
}

export default Offer