import React from 'react'
import Right from './right/right'
import Left from './left/left'

function Top() {
    return (
        <div className='flex justify-between mb-[32px]'>
            <Left />
            <Right />
        </div>
    )
}

export default Top