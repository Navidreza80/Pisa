import React, { ReactNode } from 'react'

interface FeaturesProps{
    icon:ReactNode;
    desc:string;
    title:string;
}

function Features({icon , desc, title}:FeaturesProps ) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md text-center transform transition-all hover:scale-105">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{desc}</p>
        </div>
    )
}

export default Features