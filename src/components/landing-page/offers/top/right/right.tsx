import React from 'react'
import Title from './Items/title'
import Time from './Items/time'
import Season from './Items/season'

function Right() {
    return (
        <div className='flex flex-row-reverse gap-[20px]'>
            <Title />
            <Season />
            <Time />
        </div>
    )
}

export default Right