import React from 'react';
import Price from './Items/price';

interface BottomProps {
    price: number;  
}


function BottomCard({ price }: BottomProps) {
    
    return (
        <div className='flex flex-row-reverse gap-[10px]'>
            <Price price={price} />
        </div>
    );
}

export default BottomCard;