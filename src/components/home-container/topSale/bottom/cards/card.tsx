import React from 'react'
import Bottom from './bottom/bottom'
import Top from './top/top'

interface CardProps {
    title: string;
    Location: string;
    imageUrl: string;
    bathroom: number;
    parking: number;
    room: number;
    yard: boolean;
    price: number;
}

function Card({ title, Location, imageUrl, bathroom, parking, room,yard, price,}: CardProps) {
    return (
        <>
            <div className='flex flex-col flex-wrap justify-between border-[1px] w-[391px] p-[16px] rounded-[40px] h-[438px] border-[#EAEAEA]'>
                <Top
                    title={title}
                    location={Location}
                    imageUrl={imageUrl}
                />
                <div className='bg-[#EAEAEA] h-[1px]'></div>
                <Bottom 
                    bathroom={bathroom}
                    yard={yard}
                    room={room}
                    parking={parking}
                    price={price}
                    />
            </div>
        </>
    )
}

export default Card