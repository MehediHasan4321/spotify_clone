'use client'
import {HiHome} from 'react-icons/hi'
import {BiSearch} from 'react-icons/bi'
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import Box from './Box';
import SidebarItems from './SidebarItems';
import Library from './Library';
import { Song } from '@/tpyes';
import { twMerge } from 'tailwind-merge';
import usePlayer from '@/hooks/usePlayer';
interface SidebarProps{
    children:React.ReactNode
    songs:Song[]
}


const Sidebar:React.FC<SidebarProps> = ({children,songs}) => {

    const pathname = usePathname()
    const player = usePlayer()

    const routes = useMemo(()=>[
        {
            label:'Home',
            active:pathname !== 'search',
            href:'/',
            icon:HiHome
        },
        {
            label:'Search',
            active:pathname === 'search',
            href:'/search',
            icon:BiSearch
        }
    ],[pathname])



    return (
        <div className={twMerge(`flex h-full`,player.activeId  && 'h-[calc(100%-80px)]')}>
            <div className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2'>
                <Box>
                    <div className='flex flex-col gap-y-4 p-4'>
                        {
                            routes.map(item=>(
                                <SidebarItems key={item.label} {...item}/>
                            ))
                        }
                    </div>
                </Box>
                <Box className=' overflow-y-auto h-full'>
                    <Library songs={songs}/>
                </Box>
            </div>
            <main className=' h-full flex-1 overflow-y-auto py-2'>
                {children}
            </main>
        </div>
    );
};

export default Sidebar;