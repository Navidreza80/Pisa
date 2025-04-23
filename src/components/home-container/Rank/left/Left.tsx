import Image from 'next/image'
import rank from '@/assets/images/landing/rank.png'

function Left() {
  return (
    <div>
      <Image className='w-[722px] h-[493px] rounded-[40px]' src={rank} alt="Rank Icon" />
    </div>
  )
}

export default Left
