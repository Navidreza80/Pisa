import React from 'react'

interface QuestionProps{
    title:string;
    desc:string;
}

function Question({title,desc}:QuestionProps) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{desc}</p>
        </div>
    )
}

export default Question