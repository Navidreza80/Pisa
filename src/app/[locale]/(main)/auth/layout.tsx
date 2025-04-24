import Auth from '@/components/auth/auth'
import React from 'react'


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex justify-between'>
            <Auth />
            {children}
        </div>
    )
}
