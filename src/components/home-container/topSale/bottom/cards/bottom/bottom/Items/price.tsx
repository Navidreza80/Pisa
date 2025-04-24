import React from 'react'

interface PriceProps {
  price: number;
}
function Price({ price }: PriceProps) {
  return (
    <div className='relative'>
      <div className='flex flex-row-reverse gap-[5px] '>
        <h1 className='text-[20px] font-[yekannum] font-[700] my-auto'>{price}</h1>
        <p className='text-[12px] font-[700] my-auto text-text-secondary dark:text-text-secondary-dark'>تومان</p>
      </div>
    </div>
  )
}

export default Price