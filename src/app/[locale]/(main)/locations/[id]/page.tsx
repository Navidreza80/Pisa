import MainImages from '@/components/single-house/main-images'
import Image from 'next/image'
import React from 'react'



function page() {
    return (
        <div dir='rtl' className='px-[104] pt-[52px]'>
            <div className='flex justify-between w-full'>
                <div className='w-[49.06731%]'>
                    <MainImages
                        photos={[
                            "https://media.istockphoto.com/id/813369084/photo/stylish-house-with-large-lawn.jpg?s=2048x2048&w=is&k=20&c=Jcp5Bv1LOD-zSAf-6GZhlU4EduK964EuhefgyQsm6y8=",
                            "https://media.istockphoto.com/id/1132292535/photo/living-room-with-part-of-sofa-in-sunny-day-and-white-curtain.jpg?s=2048x2048&w=is&k=20&c=i27K6P-wgZFj5OQ8cibBbktSGaBfh0z6OhLnzaIKmg0="
                        ]}
                    />
                </div>
                <div className='w-[48.1751%]'>
                    <Image className='rounded-2xl w-full h-[412px]' width={632} height={412} src="https://www.flytoday.ir/blog/wp-content/uploads/2023/06/%D8%AC%D8%A7%D9%87%D8%A7%DB%8C-%D8%AF%DB%8C%D8%AF%D9%86%DB%8C-%D8%B3%D8%A7%D8%B1%DB%8C-8.jpg" alt='' />
                    <h1 className='mt-[52px]'>مقاصد دیدنی ساری</h1>
                </div>
            </div>
        </div>
    )
}

export default page