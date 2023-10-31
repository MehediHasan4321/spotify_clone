import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import {twMerge} from 'tailwind-merge'
interface SidebarItemsProps {
    icon:IconType,
    label:string,
    active?:boolean,
    href:string
}


const SidebarItems:React.FC<SidebarItemsProps> = ({icon:Icon,label,active,href}) => {
    return (
        <Link  href={href} className={twMerge(`flex flex-row h-auto items-center w-full text-md gap-x-4 font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1`)}>
            <Icon size={26}/>
            <p className=' truncate w-100'>{label}</p>
        </Link>
    );
};

export default SidebarItems;