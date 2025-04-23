import React from 'react'

interface ImageProps {
    imageUrl: string;
}

function Image({imageUrl }: ImageProps) {
  return (
    <img className='w-full h-[221px] rounded-b-[16px] rounded-t-[24px]'  src={imageUrl} alt="" />
  )
}

export default Image