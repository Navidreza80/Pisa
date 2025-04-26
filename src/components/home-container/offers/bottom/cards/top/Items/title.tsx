import React from 'react'

interface TitleProps {
    title: string;
}

function Title({title }: TitleProps) {
  return (
    <h1 className='font-[600] text-right text-[20px] text-text '>{title}</h1>
  )
}

export default Title