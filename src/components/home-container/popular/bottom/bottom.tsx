import React from 'react';
import Tehran from '@/assets/images/landing/popular/tehran.png';
import Sari from '@/assets/images/landing/popular/sari.png';
import Savadkoh from '@/assets/images/landing/popular/savadkoh.png';

const cardData = [
    { id: 1, name: 'ساری', image: Sari, count:50,},
    { id: 2, name: 'تهران', image: Tehran, count:50, },
    { id: 3, name: 'سوادکوه', image: Savadkoh, count:50, },
    { id: 4, name: 'ساری', image: Sari, count:50,},
    { id: 5, name: 'تهران', image: Tehran, count:50, },
    { id: 6, name: 'سوادکوه', image: Savadkoh, count:50, },
];

function Bottom() {
    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-wrap justify-center gap-6 mb-6">
                {cardData.slice(0, 6).map((card) => (
                    <div key={card.id} className="flex-1 bg-white border-[1px] border-[#EAEAEA]  p-[12px] rounded-[20px] min-h-[235] max-h-[235] min-w-[389px] max-w-[389px]">
                        <img 
                            src={card.image.src} 
                            alt={card.name}
                            className="w-full min-h-[153px] max-h-[153px] rounded-[20px] bg-cover"
                        />
                        <div className="p-4 flex flex-row-reverse justify-between text-center">
                            <p className="text-lg text-[20px] font-[600] text-black">{card.name}</p>
                            <div className='flex gap-[2px] flex-row-reverse text-[16px] font-[600] text-[#848484]'>
                                )<p className='text-[16px] font-[600] text-[#848484]'>{card.count}</p>
                                <p className='text-[16px] font-[600] text-[#848484]'>مورد</p>(
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Bottom;