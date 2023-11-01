'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import Button from './Button';
import useAuthModel from '@/hooks/useAuthModel';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { FaUserAlt } from 'react-icons/fa';
import toast from 'react-hot-toast/headless';


interface HeaderProps {
    children: React.ReactNode,
    className?: string
}


const Header: React.FC<HeaderProps> = ({ children, className }) => {
    const router = useRouter()
    const authModle = useAuthModel()
    const supabaseClient = useSupabaseClient()
    const { user, subscription } = useUser()

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut()
        //TODO: Reset anyplaying song
        router.refresh()

        if (error) {
            toast.error(error.message)

        }else{
            toast.success('Logout Success')
        }

    }

    return (
        <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}>
            <div className='w-full mb-4 flex items-center justify-between'>
                <div className='hidden md:flex gap-x-2 items-center'>
                    <button onClick={() => router.back} className='rounded-full bg-black flex items-center justify-between hover:opacity-75 transition'>
                        <RxCaretLeft />
                    </button>
                    <button onClick={() => router.forward} className='rounded-full bg-black flex items-center justify-between hover:opacity-75 transition'>
                        <RxCaretRight />
                    </button>
                </div>
                <div className='flex md:hidden gap-x-2 items-center'>
                    <button className='rounded-full bg-white p-2 flex justify-center items-center hover:opacity-75 transition'>
                        <HiHome className='text-black' size={20} />
                    </button>
                    <button className='rounded-full bg-white p-2 flex justify-center items-center hover:opacity-75 transition'>
                        <BiSearch className='text-black' size={20} />
                    </button>
                </div>
                {
                    user ? <div className='flex items-center gap-x-4'>
                        <Button onClick={handleLogout} className='bg-white px-6 py-2 '> 
                            Logout
                        </Button>
                        <Button onClick={()=>router.push('/account')}
                        className='bg-white'
                        >
                            <FaUserAlt/>
                        </Button>
                    </div> : <>
                        <div className='flex justify-between  items-center gap-x-4'>
                            <>
                                <Button onClick={authModle.onOpen} className=' bg-transparent text-neutral-300 font-medium'>
                                    Signup
                                </Button>
                                <Button className=' bg-white px-6 py-2' onClick={authModle.onOpen}>
                                    Login
                                </Button>
                            </>
                        </div>
                    </>
                }
            </div>
            {children}
        </div>
    );
};

export default Header;