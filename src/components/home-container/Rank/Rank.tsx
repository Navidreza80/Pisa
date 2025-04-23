import React from 'react'
import Right from './right/Right'
import Left from './left/Left'

function Rank() {
    return (
        <div className='flex flex-row-reverse justify-between'>
            <Right />
            <Left />
        </div>
    )
}

export default Rank