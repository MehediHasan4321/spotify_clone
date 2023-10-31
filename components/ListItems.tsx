'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaPlay } from 'react-icons/fa'
import React from 'react';
interface ListItemsPorps {
    image: string,
    name: string,
    href: string
}


const ListItems: React.FC<ListItemsPorps> = ({ image, name, href }) => {

    const router = useRouter()
    const handleClick = () => {
        //add Authintication before push
        router.push(href)
    }
    return (
        <button
        onClick={handleClick}
        className='
        relative
        group
        flex
        items-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-100/10
        hover:neutral-100/20
        transition
        pr-4
        '>
            <div className='relative min-h-[64px] min-w-[64px]'>
                <Image className=' object-cover' fill src={image} alt='image ' />
            </div>
            <p>
                {name}
            </p>
            <div className='absolute transition opacity-0 rounded-full bg-green-500 flex justify-center items-center drop-shadow-md right-5 p-4 group-hover:opacity-100 hover:scale-110'>
                <FaPlay className='text-black' />
            </div>
        </button>
    );
};

export default ListItems;