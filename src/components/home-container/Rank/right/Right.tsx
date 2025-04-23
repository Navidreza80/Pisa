import React from 'react'
import Logo from './logo/Logo'
import Desc from './desc/Desc'

function Right() {
    return (
        <div className='flex flex-col flex-wrap gap-[24px]'>
            <Logo />
            <Desc />
        </div>
    )
}

export default Right