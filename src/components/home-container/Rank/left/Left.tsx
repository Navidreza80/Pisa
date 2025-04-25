import Image from 'next/image'
import rank from '@/assets/images/landing/rank.png'

function Left() {
  return (
    <div>
      <Image className='w-[722px] h-[493px] md:hidden hidden lg:block rounded-[40px]' src={rank} alt="Rank Icon" />
    </div>
  )
}

export default Left
