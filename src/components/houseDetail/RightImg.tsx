"use client"

import { useState } from 'react';
import React from 'react'
import VirtualTour from '../3D/VirtualTour';

function RightImg({ detail }) {
    const [show3DTour, setShow3DTour] = useState(false);
    const [current3DImage, setCurrent3DImage] = useState("پذیرایی");
    const virtualTours = [
        { title: "پذیرایی", url: 'https://static.vecteezy.com/system/resources/previews/019/062/597/non_2x/full-spherical-seamless-hdri-360-panorama-in-interior-of-guest-living-room-hall-in-apartment-with-sofa-armchairs-and-dinner-table-in-equirectangular-projection-vr-content-photo.jpg' },
        { title: "اتاق", url: 'https://static.vecteezy.com/system/resources/previews/022/876/112/non_2x/full-seamless-spherical-hdri-360-panorama-in-interior-of-bedroom-in-studio-apartments-with-arched-access-to-the-balcony-in-equirectangular-projection-vr-content-photo.jpg' },
        { title: "حمام", url: 'https://static.vecteezy.com/system/resources/previews/019/924/442/non_2x/white-seamless-360-hdri-panorama-in-interior-of-expensive-bathroom-in-modern-flat-apartments-with-washbasin-in-equirectangular-projection-with-zenith-and-nadir-vr-ar-content-photo.jpg' },
        { title: "پارکینگ", url: 'https://cdn.polyhaven.com/asset_img/primary/parking_garage.png?height=760' }
    ];

    const handle3DImageChange = (title) => {
        setCurrent3DImage(title);
    };


    const currentImageUrl = virtualTours.find(tour => tour.title === current3DImage)?.url || virtualTours[0].url;

    console.log(currentImageUrl)
    return (
        <>
            <div className="relative w-[47%] h-[387px]">
                <button
                    onClick={() => setShow3DTour(!show3DTour)}
                    className=" bg-white mb-4 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition z-10"
                >
                    {show3DTour ? 'نمایش عکس' : 'نمایش 3 بعدی'}
                </button>

                {show3DTour ? (
                    <div className="w-full h-full">
                        <VirtualTour img={currentImageUrl} />
                        <div className='flex justify-end gap-2 mt-[13px]'>
                            {virtualTours.map((tour) => (
                                <button
                                    key={tour.title}
                                    onClick={() => handle3DImageChange(tour.title)}
                                    className={`bg-white px-3 py-1 rounded-lg shadow-md hover:bg-gray-100 transition ${current3DImage === tour.title ? '!bg-blue-500 text-white' : ''
                                        }`}
                                >
                                    {tour.title}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <img
                        src={detail.photos[0]}
                        className="w-full h-full rounded-t-3xl rounded-b-2xl object-cover"
                        alt="Property"
                    />
                )}


            </div>


        </>
    );
}

export default RightImg;