import MapSVG from '@/components/common/svg/map'
import Image from 'next/image'


function page() {
    return (
        <div dir='rtl' className='px-[104] pt-[52px]'>
            <div className='flex justify-between w-full'>
                <div className='w-[39.06731%] flex flex-col flex-wrap gap-[60px]'>
                    <span className='mb-[93px]'></span>
                    <div className='sticky top-4'>
                        <div className='border-[1px] rounded-2xl flex flex-col flex-wrap gap-4 border-gray-300 h-auto w-full p-6'>
                            <h2 className='text-2xl font-bold mb-4 text-center'>ثبت نام در تور</h2>
                            <div>
                                <label htmlFor='fullName' className='block mb-1 font-medium'>نام و نام خانوادگی</label>
                                <input
                                    type='text'
                                    id='fullName'
                                    name='fullName'
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder=' نام و نام خانوادگی را وارد کنید'
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor='phone' className='block mb-1 font-medium'>شماره تلفن</label>
                                <input
                                    type='tel'
                                    id='phone'
                                    name='phone'
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='09xxxxxxxxx'
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor='participants' className='block mb-1 font-medium'>تعداد نفرات</label>
                                <select
                                    id='participants'
                                    name='participants'
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    required
                                >
                                    <option value='1'>1 نفر</option>
                                    <option value='2'>2 نفر</option>
                                    <option value='3'>3 نفر</option>
                                    <option value='4'>4 نفر</option>
                                    <option value='5+'>5 نفر یا بیشتر</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor='email' className='block mb-1 font-medium'>ایمیل (اختیاری)</label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='example@domain.com'
                                />
                            </div>

                            <div>
                                <label htmlFor='notes' className='block mb-1 font-medium'>توضیحات اضافه (اختیاری)</label>
                                <textarea
                                    id='notes'
                                    name='notes'
                                    rows='3'
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='درخواست‌های خاص یا توضیحات اضافه'
                                ></textarea>
                            </div>

                            <button
                                type='submit'
                                className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200'
                            >
                                ثبت نام در تور
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-[58.1751%]'>
                    <h1 className='mt-[52px] text-[32px] font-bold'>تور گردشگری سالار دره</h1>
                    <div className="flex gap-2 mt-2 items-center">
                        <MapSVG color="#595959" />
                        <h1 className="text-[14px] font-medium text-[#595959]">ساری, سالار دره</h1>
                    </div>
                    <Image
                        className='w-full h-[400px] mt-[20px] rounded-2xl border-[1px] border-[#595959]'
                        width={632}
                        height={400}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAiymgCZXN4YHk75o1IY-MLXLb8cLSRVrSUQ&s"
                        alt=''
                    />
                    <h1 className='mt-[40px] text-[16px] font-medium'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</h1>
                    <div className="mt-[50px] bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                        <div className="relative">
                            <div className="pt-6 pb-4 px-6 border-b border-gray-100">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                    <div>
                                        <span className="inline-block px-3 py-1 rounded-md bg-blue-50 text-blue-600 text-sm font-medium mb-2">تور ویژه تابستانه</span>
                                        <h2 className="text-2xl font-bold text-gray-800 mb-1">مزایای اختصاصی تور استانبول</h2>
                                        <p className="text-gray-500 text-sm">تجربه‌ای منحصر به فرد در قلب ترکیه</p>
                                    </div>
                                    <div className="mt-4 md:mt-0">
                                        <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="border border-gray-100 p-5 rounded-xl hover:border-gray-200 transition-colors duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="p-2 bg-blue-50 rounded-lg mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-800">هزینه تور</h3>
                                        </div>
                                        <p className="text-gray-500 text-sm mb-2">شروع قیمت از:</p>
                                        <div className="flex items-end mb-3">
                                            <p className="text-2xl font-bold text-blue-600">1,500,000</p>
                                            <p className="text-gray-600 mr-1">تومان</p>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                امکان پرداخت اقساطی
                                            </span>
                                        </div>
                                    </div>
                                    <div className="border border-gray-100 p-5 rounded-xl hover:border-gray-200 transition-colors duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="p-2 bg-blue-50 rounded-lg mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-800">زمانبندی تور</h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 mb-3">
                                            <div className="bg-gray-50 p-2 rounded-lg">
                                                <p className="text-gray-500 text-xs mb-1">تاریخ شروع:</p>
                                                <p className="font-bold text-gray-800 text-sm">11 تیر 1400</p>
                                            </div>
                                            <div className="bg-gray-50 p-2 rounded-lg">
                                                <p className="text-gray-500 text-xs mb-1">تاریخ پایان:</p>
                                                <p className="font-bold text-gray-800 text-sm">15 تیر 1400</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-gray-700 text-sm">مدت زمان: <span className="font-bold text-blue-600">5 روز</span></p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                                    <div className="border border-gray-100 p-5 rounded-xl hover:border-gray-200 transition-colors duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="p-2 bg-blue-50 rounded-lg mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-800">خدمات شامل</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2 flex-shrink-0"></div>
                                                <span className="text-gray-700 text-sm">حمل و نقل رایگان (هوایی و زمینی)</span>
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2 flex-shrink-0"></div>
                                                <span className="text-gray-700 text-sm">راهنمای تور حرفه‌ای دو زبانه</span>
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2 flex-shrink-0"></div>
                                                <span className="text-gray-700 text-sm">صبحانه و ناهار در رستوران‌های معتبر</span>
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2 flex-shrink-0"></div>
                                                <span className="text-gray-700 text-sm">ورودیه جاذبه‌های گردشگری</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="border border-gray-100 p-5 rounded-xl hover:border-gray-200 transition-colors duration-300">
                                        <div className="flex items-center mb-3">
                                            <div className="p-2 bg-blue-50 rounded-lg mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-800">امکانات ویژه</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2 flex-shrink-0"></div>
                                                <span className="text-gray-700 text-sm">بیمه مسافرتی با پوشش کامل</span>
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2 flex-shrink-0"></div>
                                                <span className="text-gray-700 text-sm">اقامت در هتل 4 ستاره با خدمات عالی</span>
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2 flex-shrink-0"></div>
                                                <span className="text-gray-700 text-sm">دسترسی به اینترنت پرسرعت رایگان</span>
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2 flex-shrink-0"></div>
                                                <span className="text-gray-700 text-sm">هدیه ویژه به همراه سوغاتی</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-5 border border-gray-100 p-5 rounded-xl hover:border-gray-200 transition-colors duration-300">
                                    <div className="flex items-center mb-3">
                                        <div className="p-2 bg-blue-50 rounded-lg mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800">ویژگی‌های برجسته</h3>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <div className="flex flex-col items-center justify-center bg-gray-50 p-3 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            <span className="text-xs text-gray-700 text-center">اقامت لوکس</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center bg-gray-50 p-3 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-xs text-gray-700 text-center">قیمت مناسب</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center bg-gray-50 p-3 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span className="text-xs text-gray-700 text-center">راهنمای مجرب</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center bg-gray-50 p-3 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <span className="text-xs text-gray-700 text-center">امنیت کامل</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 text-center">
                                    <div className="inline-flex items-center px-3 py-1.5 bg-gray-50 text-gray-700 text-sm rounded-lg border border-gray-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        امکان کنسلی رایگان تا 7 روز قبل از حرکت
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page