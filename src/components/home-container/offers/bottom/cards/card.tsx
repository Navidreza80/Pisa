import React from 'react'
import Bottom from './bottom/bottom'
import Top from './top/top'

interface CardProps {
    title: string;
    Location: string;
    imageUrl: string;
    bathroom: number;
    person: number;
    room: number;
    offer: number;
    price: number;
}

function Card({ title, Location, imageUrl, bathroom, person, room,offer, price,}: CardProps) {
    return (
        <>
            <div className='flex flex-col flex-wrap lg:justify-between md:justify-center justify-center border-[1px] min-w-[391px] w-[calc(33.3%-20px)] p-[16px] rounded-[40px] h-[438px] border-border  '>
                <Top
                    title={title}
                    location={Location}
                    imageUrl={imageUrl}
                />
                <div className='bg-border  h-[1px]'></div>
                <Bottom 
                    bathroom={bathroom}
                    person={person}
                    room={room}
                    offer={offer}
                    price={price}
                    />
            </div>
        </>
    )
}

export default Card