import Map from '@/components/reserve-container/map'
import MainImages from '@/components/single-house/main-images'
import Image from 'next/image'

const maghased = [
    {
        id: 1,
        title: "پارک جنگلی شهید زارع",
        imageUrl: "https://anyja.ir/assets/upload/blog/AR-2309-1400-9-15-14-18-vbrrt.jpg",
        description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
    },
    {
        id: 2,
        title: "بوستان ملل",
        imageUrl: "https://www.mihmansho.com/mag/Files/Root/exteraImage/66d14a81-0f2a-4b13-93bd-8b0d07c0f175_mihmansho.jpg",
        description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
    }
]


function page() {
    return (
        <div dir='rtl' className='px-[104] pt-[52px]'>
            <div className='flex justify-between w-full'>
                <div className='w-[49.06731%] flex flex-col flex-wrap gap-[60px]'>
                    <div className='mb-[65px]'>
                    <MainImages
                        photos={[
                            "https://media.istockphoto.com/id/813369084/photo/stylish-house-with-large-lawn.jpg?s=2048x2048&w=is&k=20&c=Jcp5Bv1LOD-zSAf-6GZhlU4EduK964EuhefgyQsm6y8=",
                            "https://media.istockphoto.com/id/1132292535/photo/living-room-with-part-of-sofa-in-sunny-day-and-white-curtain.jpg?s=2048x2048&w=is&k=20&c=i27K6P-wgZFj5OQ8cibBbktSGaBfh0z6OhLnzaIKmg0="
                        ]}
                        sticky={false}
                    />
                    </div>
                    <div className="sticky top-10 ">
                        <h1 className='mb-[18px]  font-medium text-[16px] text-[#586CFF]'>موقعیت مکانی</h1>
                        <div className='h-[350px] text-white m-auto bg-red-600'>  نقشه بزار ت. بک باید درست شه واسه یارو</div>
                    </div>
                </div>
                <div className='w-[48.1751%]'>
                    <Image className='rounded-2xl w-full h-[412px]' width={632} height={412} src="https://www.flytoday.ir/blog/wp-content/uploads/2023/06/%D8%AC%D8%A7%D9%87%D8%A7%DB%8C-%D8%AF%DB%8C%D8%AF%D9%86%DB%8C-%D8%B3%D8%A7%D8%B1%DB%8C-8.jpg" alt='' />
                    <h1 className='mt-[52px] text-[32px] font-bold'>مقاصد دیدنی ساری</h1>
                    <h1 className='mt-[52px] text-[16px] font-medium'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</h1>

                    {maghased.map((maghased) => (
                        <div key={maghased.id} className="mb-12">
                            <h1 className="mt-[52px] text-[32px] font-bold text-right">
                                {maghased.title}
                            </h1>

                            <div className="relative w-full h-[412px] rounded-2xl overflow-hidden mt-4">
                                <Image
                                    src={maghased.imageUrl}
                                    alt={maghased.title}
                                    layout="fill"
                                    objectFit="cover"
                                    quality={75}
                                    className="rounded-2xl"
                                />
                            </div>

                            <p className="mt-[52px] text-[16px] font-medium text-right leading-8">
                                {maghased.description}
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default page