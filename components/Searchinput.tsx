'use client'
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import React, { useState,useEffect } from 'react';
import qs from 'query-string'
import Input from './input';

const Searchinput = () => {
    const router = useRouter()
    const [value,setValue] = useState<string>('')
    const debounceValue = useDebounce(value,500)

    useEffect(()=>{
        const query = {
            title:debounceValue
        }

        const url = qs.stringifyUrl({
            url:'/search',
            query:query
        })

        router.push(url)

    },[debounceValue,router])


    return (
        <div>
            <Input 
            className='mt-4 px-2'
            placeholder='What do you want to listen to?'
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            />
        </div>
    );
};

export default Searchinput;