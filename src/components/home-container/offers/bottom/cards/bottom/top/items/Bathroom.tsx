import React from 'react'

interface BathroomProps {
    bathroom: number;
}
function Bathroom({ bathroom }: BathroomProps) {
    return (
        <div className='flex flex-row-reverse gap-[5px]'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 20L5 21M18 20L19 21" stroke="#595959" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#595959" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12H22" stroke="#595959" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#595959" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8 6L10.5 4" stroke="#595959" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

            <div className='flex flex-row-reverse gap-[3px]'>
                <h1 className='font-yekannum'>{bathroom}</h1>
                <h1>حمام</h1>
            </div>
        </div>
    )
}

export default Bathroom