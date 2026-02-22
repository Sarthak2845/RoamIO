import React from 'react'
import { MdExplore } from 'react-icons/md'
import Link from 'next/link'
const Icon = () => {
    return (
        <Link href="/">
            <div className="flex items-center gap-2">
                <div className="bg-blue-500 p-1.5 rounded-lg flex items-center justify-center">
                    <MdExplore className="text-background-dark" size={24} />
                </div>
                <span className="text-xl font-extrabold tracking-tight hidden sm:block">Roam<span className="text-blue-500">I0</span></span>
            </div>
        </Link>
    )
}

export default Icon
