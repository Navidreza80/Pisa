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
            <div className='flex flex-col flex-wrap justify-between border-[1px] w-[391px] p-[16px] rounded-[40px] h-[438px] border-border dark:border-border-dark dark:bg-surface-dark'>
                <Top
                    title={title}
                    location={Location}
                    imageUrl={imageUrl}
                />
                <div className='bg-border dark:bg-border-dark h-[1px]'></div>
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