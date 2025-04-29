'use client';

import FallbackImage from '@/components/common/image/FallbackImage';

import navid from '@/assets/images/about-us/navid.jpg';
import taha from '@/assets/images/about-us/taha.jpg';
import elmira from '@/assets/images/about-us/elmira.jpg';
import nextElites from '@/assets/images/landing/rank.png';

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ProfileNextElites from './Items/ProfileNextElites';
import Mentor from './Items/Mentor';
import Features from './Items/Features';
import Question from './Items/Question';
import Input from './Items/Input';


export default function AboutUs() {
    useEffect(() => {
        const map = L.map('map').setView([36.67809, 53.058983], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([60.5658, 53.0588]).addTo(map)
            .bindPopup(' آکادمی سپهر')
            .openPopup();

        return () => {
            map.remove();
        };
    }, []);
    return (
        <main className="min-h-screen py-[20px] px-4">
            <div className="container mx-auto">
                <div className="mb-20 max-w-6xl mx-auto">
                    <Mentor />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ProfileNextElites name='Navid Abbaszadeh' job='Frontend Developer' profile={navid.src} />
                        <ProfileNextElites name='Taha Talebi ' job='Frontend Developer' profile={taha.src} />
                        <ProfileNextElites name='Elmira Shirkhani' job='Frontend Developer' profile={elmira.src} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
                    <div className="relative">
                        <div className="absolute -bottom-4 -right-4 w-full h-full bg-blue-600 rounded-2xl"></div>
                        <img
                            src={nextElites.src}
                            alt="Next Elites Team"
                            className="w-full h-auto object-cover rounded-2xl shadow-lg relative z-10"
                        />
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">داستان ما</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            به <span className="font-bold text-blue-600">Next Elites</span> خوش آمدید! ما یک تیم متخصص در توسعه وب هستیم که با استفاده از فناوری‌های پیشرفته، راه‌حل‌های نوآورانه در زمینه املاک ارائه می‌دهیم.
                        </p>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            ما به ساخت تجربه‌های مدرن، مقیاس‌پذیر و کاربرپسند وب متعهد هستیم. تیم ما همواره در تلاش برای ارائه نوآوری و کیفیت در هر پروژه است.
                        </p>
                        <p className="text-gray-700 mb-8 leading-relaxed">
                            در زمینه املاک، ما پلتفرمی ایجاد کرده‌ایم که خرید، فروش و اجاره ملک را برای مشتریان آسان‌تر می‌کند. با استفاده از فناوری‌های پیشرفته، ما امکان جستجوی هوشمند، مشاهده تصاویر با کیفیت بالا و ارتباط مستقیم با مشاوران املاک را فراهم می‌کنیم.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a
                                href="/contact"
                                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
                            >
                                تماس با ما
                            </a>
                            <a
                                href="/"
                                className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition"
                            >
                                صفحه اصلی
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-16 bg-white p-8 rounded-2xl shadow-lg max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">خدمات املاک ما</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        در Next Elites، ما مجموعه‌ای از خدمات املاک را ارائه می‌دهیم که به مشتریان کمک می‌کند تا بهترین انتخاب را برای سرمایه‌گذاری، خرید یا اجاره ملک داشته باشند. تیم ما با تجربه و دانش گسترده در بازار املاک، راهنمایی‌های ارزشمندی را به مشتریان ارائه می‌دهد.
                    </p>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        پلتفرم ما امکان جستجوی پیشرفته بر اساس موقعیت، قیمت، متراژ و سایر ویژگی‌ها را فراهم می‌کند. همچنین، با استفاده از هوش مصنوعی، پیشنهادهای شخصی‌سازی شده برای هر کاربر ارائه می‌دهیم که متناسب با نیازها و ترجیحات آن‌ها است.
                    </p>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        ما همچنین خدمات مشاوره حقوقی در زمینه معاملات املاک، ارزیابی ملک، و مدیریت اجاره را ارائه می‌دهیم. هدف ما ایجاد یک تجربه بدون دردسر و شفاف برای تمام مشتریان است.
                    </p>
                </div>

                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <Features title='کیفیت' desc='ما به ارائه محصولات با کیفیت بالا و بدون نقص متعهد هستیم' icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>} />

                    <Features title='نوآوری' desc='همیشه به دنبال راه‌های جدید و خلاقانه برای حل مشکلات هستیم' icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>} />

                    <Features title='همکاری' desc='با مشتریان و مشاوران املاک خود همکاری نزدیک داریم تا بهترین نتایج را به دست آوریم' icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>} />
                </div>

                <div className="mt-24 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">تماس با ما</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">اطلاعات تماس</h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ml-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">تلفن</p>
                                        <p className="text-gray-600">۰۲۱-۸۸۷۷۶۶۵۵</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ml-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">ایمیل</p>
                                        <p className="text-gray-600">NextElites@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ml-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">آدرس</p>
                                        <p className="text-gray-600">مازندران, ساری, جاده دریا,100 متر جلوتر از دنیای آرزو ها,ساختمان سپهر</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">ما را در شبکه‌های اجتماعی دنبال کنید</h3>
                                <div className="flex space-x-4">
                                    <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white hover:bg-blue-900 transition">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">ارسال پیام</h3>
                            <form className="space-y-4">
                                <Input title='نام و نام خانوادگی' placeholder='نام خود را وارد کنید' id='name' type='text' />
                                <Input title='ایمیل' placeholder='ایمیل خود را وارد کنید' id='email' type='email' />
                                <Input title='موضوع' placeholder='موضوع پیام' id='subject' type='text' />

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">پیام</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="پیام خود را بنویسید"
                                    ></textarea>
                                </div>

                                <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md">
                                    ارسال پیام
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="mt-24 max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">سوالات متداول</h2>
                    <div className="space-y-6">
                        <Question title='چگونه می‌توانم ملک مورد نظرم را پیدا کنم؟' desc='شما می‌توانید با استفاده از فیلترهای جستجوی پیشرفته در وبسایت ما، ملک مورد نظر خود را بر اساس موقعیت، قیمت، متراژ و سایر ویژگی‌ها پیدا کنید. همچنین می‌توانید با مشاوران املاک ما تماس بگیرید تا به شما در یافتن بهترین گزینه کمک کنند' />
                        <Question title='چگونه می‌توانم ملک خود را برای فروش یا اجاره در سایت شما قرار دهم؟' desc='برای ثبت ملک خود در سایت ما، ابتدا باید در سایت ثبت‌نام کنید. سپس از طریق پنل کاربری، می‌توانید اطلاعات و تصاویر ملک خود را آپلود کنید. پس از تأیید توسط تیم ما، ملک شما در سایت قرار می‌گیرد' />
                        <Question title='آیا خدمات مشاوره حقوقی هم ارائه می‌دهید؟' desc='بله، ما خدمات مشاوره حقوقی در زمینه معاملات املاک را ارائه می‌دهیم. مشاوران حقوقی ما می‌توانند در تمام مراحل خرید، فروش یا اجاره ملک به شما کمک کنند' />
                    </div>
                </div>

                <div className="mt-24 max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">موقعیت ما</h2>
                    <div className="bg-white p-4 rounded-xl shadow-lg">
                        <div className="h-96 bg-gray-200 rounded-lg">
                            <div id="map" className="w-full h-full rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}