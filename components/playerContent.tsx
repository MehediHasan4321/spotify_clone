'use client'

import { Song } from "@/tpyes"
import useSound from 'use-sound';
import MediaItem from "./MediaItem"
import LikeButton from "./likebutton"
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai"
import { HiSpeakerXMark, HiSpeakerWave } from 'react-icons/hi2'
import Slider from "./slider"
import usePlayer from "@/hooks/usePlayer"
import { useEffect, useState } from 'react'

interface PlayerContentProps {
    song: Song,
    key: string,
    songUrl: string
}


const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl, key }) => {
    const player = usePlayer()
    const [volume, setVolume] = useState(1)
    const [playing, setPlaying] = useState(false)

    
    const Icon = playing ? BsPauseFill : BsPlayFill
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return
        }

        const currentIndex = player.ids.findIndex(id => id === player.activeId)
        const nextSong = player.ids[currentIndex + 1]

        if (!nextSong) {
            return player.setId(player.ids[0])
        }
        player.setId(nextSong)
    }


    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return
        }

        const currentIndex = player.ids.findIndex(id => id === player.activeId)
        const previousSong = player.ids[currentIndex - 1]

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1])
        }
        player.setId(previousSong)
    }
    
    const [play, { pause, sound }] = useSound(songUrl, {
       
        volume: volume,
        onplay: () => setPlaying(true),
        onended: () => {
            setPlaying(false)
            onPlayNext()
        },
        onpause: () => setPlaying(false),
        format: ['mp3']
    })


    useEffect(() => {
        sound?.play();
        return () => {
            sound?.onload
        }
    }, [sound])

    const handlePlay = ()=>{
        if(!playing){
            play()
        }else{
            pause()
        }
    }

    const toggleMute = ()=>{
        if(volume ===0){
            setVolume(1)
        }else{
            setVolume(0)
        }
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full items-center ">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>
            {/* only visibale for mobail */}
            <div className="flex md:hidden col-auto w-full justify-end items-center">
                <div
                    onClick={() => { }}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
                >
                    <Icon size={30}
                        color='black'
                    />
                </div>
            </div>
            <div className=" hidden h-full md:flex items-center justify-center w-full max-w-[722px] gap-x-6">
                <AiFillStepBackward
                    onClick={onPlayPrevious}
                    size={30}
                    className='text-neutral-400 cursor-pointer hover:text-white transition' />
                <div
                    onClick={handlePlay}
                    className="flex items-start justify-center w-10 h-10 bg-white cursor-pointer rounded-full p-1"
                >
                    <Icon size={30} color='black' />
                </div>
                <AiFillStepForward
                    onClick={onPlayNext}
                    size={30}
                    className='text-neutral-400 cursor-pointer hover:text-white transition' />
            </div>

            <div className=" hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon
                        onClick={toggleMute}
                        size={24}
                        className='cursor-pointer'
                    />
                    <Slider value={volume} onChange={(value)=>setVolume(value)} />
                </div>

            </div>

        </div>
    )
}

export default PlayerContent