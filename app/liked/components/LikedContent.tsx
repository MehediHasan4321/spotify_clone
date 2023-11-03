'use client'

import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/likebutton';
import { useUser } from '@/hooks/useUser';
import { Song } from '@/tpyes';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
interface LikedContentProps {
    songs: Song[],
    onClick?: () => void
}
const LikedContent: React.FC<LikedContentProps> = ({ songs, onClick }) => {

    const router = useRouter()
    const { isLoading, user } = useUser()

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/')
        }
    }, [isLoading, user, router])

    if (songs.length === 0) {
        return (
            <div className=''>
                No Song Found!
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-y-2 w-full p-6'>
            {
                songs.map(song => <div key={song.id} className='flex items-center gap-x-4 w-full'>
                    <div className='flex-1'>
                        <MediaItem onClick={()=>{}} data={song}/>
                    </div>
                    <LikeButton songId={song.id}/>
                </div>)
            }
        </div>
    );
};

export default LikedContent;