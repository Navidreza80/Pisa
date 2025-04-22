import React from 'react'
import Top from './top/top'
import BottomCard from './bottom/Bottom'

interface BottomCardProps {
    bathroom: number;
    person: number;
    room: number;
    offer: number;
    price: number;
}

function Bottom({ person, room, offer, price, bathroom }: BottomCardProps) {
    return (
        <>
            <Top
                bathroom={bathroom}
                person={person}
                room={room}
            />

            <BottomCard
                offer={offer}
                price={price}
            />
        </>
    )
}

export default Bottom