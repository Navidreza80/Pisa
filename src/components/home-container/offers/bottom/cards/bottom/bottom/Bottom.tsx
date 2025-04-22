import React from 'react';
import Price from './Items/price';
import OfferPrice from './Items/offerPrice';
import Offer from './Items/offer';

interface BottomProps {
    offer: number;  
    price: number;  
}

const calculateDiscountedPrice = (price: number, discountPercent: number): number => {
    return price * (1 - discountPercent / 100);
};

function BottomCard({ offer, price }: BottomProps) {
    const discountedPrice = calculateDiscountedPrice(price, offer);
    
    return (
        <div className='flex flex-row-reverse gap-[10px]'>
            <Price price={price} />
            <p className='text-[16px] font-[700] my-auto'>/</p>
            <OfferPrice offerPrice={discountedPrice} />
            <Offer offer={offer} />
        </div>
    );
}

export default BottomCard;