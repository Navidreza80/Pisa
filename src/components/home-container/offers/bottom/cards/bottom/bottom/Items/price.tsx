import React from 'react'

interface PriceProps{
    price: number;
}
function Price({price}:PriceProps) {
  return (
    <div className='flex flex-row-reverse gap-[5px]'>
        <h1 className='text-[20px] font-[700] my-auto font-yekannum'>{price}</h1>
        <p className='text-[12px] font-[700] my-auto'>تومان</p>
    </div>
  )
}

export default Price