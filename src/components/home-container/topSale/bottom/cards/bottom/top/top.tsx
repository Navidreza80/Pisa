import React from 'react'
import Bathroom from './items/Bathroom'
import Room from './items/Room'
import Yard from './items/Yard';
import Parking from './items/Parking';

interface TopProps {
    bathroom: number;
    yard: boolean;
    room: number;
    parking: number;
}
function Top({ yard, room, bathroom,parking }: TopProps) {
    return (
        <div className='flex flex-row-reverse justify-between'>
            <Room
                room={room}
            />
            <div className='bg-[#EAEAEA] w-[1px]' />
            <Bathroom
                bathroom={bathroom}
            />
            <div className='bg-[#EAEAEA] w-[1px]' />
            <Yard
                yard={yard}
            />
            <div className='bg-[#EAEAEA] w-[1px]' />
            <Parking
                parking={parking}
            />
        </div>
    )
}

export default Top