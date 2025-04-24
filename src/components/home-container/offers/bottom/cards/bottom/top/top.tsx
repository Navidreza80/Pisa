import React from 'react'
import Bathroom from './items/Bathroom'
import Room from './items/Room'
import Person from './items/Person'

interface TopProps {
    bathroom: number;
    person: number;
    room: number;
}
function Top({ person, room, bathroom }: TopProps) {
    return (
        <div className='flex flex-row-reverse justify-start gap-[16px]'>
            <Room
                room={room}
            />
            <div className='bg-border dark:bg-border-dark w-[1px]' />
            <Bathroom
                bathroom={bathroom}
            />
            <div className='bg-border dark:bg-border-dark w-[1px]' />
            <Person
                person={person}
            />
        </div>
    )
}

export default Top