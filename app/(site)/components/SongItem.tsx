'use client'
import useLoadImage from "@/hooks/useLoadImage"
import { Song } from "@/tpyes"
import Image from "next/image"
import React from "react"
import PlayButton from "./PlayButton"

interface SongItemProps {
    data: Song,


}

const SongItem: React.FC<SongItemProps> = ({ data }) => {
    const imagePath = useLoadImage(data)
    return (
        <div

            className="relative group flex flex-col justify-center items-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
        >
            <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                <Image
                    fill
                    src={'/images/liked.png'}
                    className=" object-cover"
                    alt="Images"
                />
            </div>
            <div className="flex flex-col items-center w-full pt-4 gap-y-1">
                <p className="font-semibold truncate w-full">{data?.title}</p>
                <p className="text-sm text-neutral-400 pb-4 w-full truncate">
                    By {data.author}
                </p>
            </div>
            <div className="absolute bottom-24 right-5">
                <PlayButton />
            </div>
        </div>
    )
}

export default SongItem