import React from 'react'

interface PriceProps {
  price: number;
}
function Price({ price }: PriceProps) {
  return (
    <div className='relative opacity-[0.5]'>
      <div className='flex flex-row-reverse gap-[5px] '>
        <h1 className='text-[20px] font-[700] my-auto'>{price}</h1>
        <p className='text-[12px] text-[#595959] font-[700] my-auto'>تومان</p>
      </div>

      <div className='bg-[#FF5555] top-[17px] absolute w-[100%] h-[2px] rotate-[-9.3deg]'></div>
    </div>
  )
}

export default Price