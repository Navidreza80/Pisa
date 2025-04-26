import Image, { StaticImageData } from 'next/image'
import React from 'react'

interface ImageAuthProps {
    ImageSrc: string | StaticImageData;
    ImageTitle: string;
}

function ImageAuth({ ImageSrc, ImageTitle }: ImageAuthProps) {
    return (
        <>
            <div className="absolute bg-[#a1a1a1] inset-0 overflow-hidden rounded-[32px]">
                <Image
                    fill
                    src={ImageSrc}
                    alt={ImageTitle}
                    className="object-cover min-w-full min-h-full"
                    priority
                    quality={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                />
            </div>
        </>
    )
}

export default ImageAuth