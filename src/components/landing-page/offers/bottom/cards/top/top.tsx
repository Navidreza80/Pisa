import React from 'react'
import Title from './Items/title'
import Image from './Items/Image'
import Location from './Items/location'

interface TopProps {
    title: string;
    location: string;
    imageUrl: string;
}

function Top({ title, location, imageUrl }: TopProps) {
    return (
        <>
            <Image imageUrl={imageUrl}/>
            <Title title={title}/>
            <Location location={location}/>
        </>
    )
}

export default Top