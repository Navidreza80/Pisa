import React from 'react'
import FilterAndTitle from './FilterAndTitle/FilterAndTitle'
import Cards from './Cards/Cards'

function Rent() {
  return (
    <div className='w-[85.5%] pt-[32px] flex flex-wrap gap-[24px] '>
        <FilterAndTitle />
        <span className='h-[1px] w-full my-auto bg-[#EAEAEA]' />
        <Cards />
    </div>
  )
}

export default Rent