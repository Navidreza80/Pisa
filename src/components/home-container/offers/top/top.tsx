import React from 'react'
import Right from './right/right'
import Left from './left/left'

function Top() {
    return (
        <div className='flex flex-wrap justify-between items-center mb-[32px]'>
            <Left />
            <Right />
        </div>
    )
}

export default Top