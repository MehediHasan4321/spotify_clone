'use client'
import { Song } from "@/tpyes"
import React from "react"
import SongItem from "./SongItem"
import useOnPlay from "@/hooks/useOnPlay"

interface PageContentPropa {
    songs: Song[],
   
}

const PageContent: React.FC<PageContentPropa> = ({ songs }) => {

    const  onPlay = useOnPlay(songs)



    if (songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400 text-center">
                No Songs Are Avaiable.
            </div>
        )
    }
   

    return (
        <div className="grid grid-cols-2 sm:grid-col-3 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-col-8 gap-4 mt-4">
            {
                songs.map(song=><SongItem key={song.id} data={song} onClick={(id:string)=>onPlay(id)}/>)
            }
        </div>
    )
}


export default PageContent