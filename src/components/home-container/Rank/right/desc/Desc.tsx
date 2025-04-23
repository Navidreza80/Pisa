import React from 'react'
import Title from './title/title'
import DescBottom from './desc/Desc'

function Desc() {
  return (
    <div className='flex flex-col justify-end flex-wrap gap-[24px]'>
        <Title />
        <DescBottom />
    </div>
  )
}

export default Desc