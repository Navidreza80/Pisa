import React from 'react'
import Top from './top/top'
import BottomCard from './bottom/Bottom'

interface BottomCardProps {
    bathroom: number;
    yard: boolean;
    room: number;
    parking: number;
    price: number;
}

function Bottom({ parking, room, yard, price, bathroom }: BottomCardProps) {
    return (
        <>
            <Top
                bathroom={bathroom}
                yard={yard}
                room={room}                
                parking={parking}
            />

            <BottomCard
                price={price}
            />
        </>
    )
}

export default Bottom