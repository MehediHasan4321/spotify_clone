import { Song } from "@/tpyes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies,headers } from "next/headers";
import getSong from "./getSong";

const getSongByTitle = async(title:string):Promise<Song[]> =>{
    const supabase = createServerComponentClient({
        cookies:cookies,
        
    })

    if(!title){
        const allSong = await getSong()
        return allSong
    }

    const {data,error} = await supabase.from('songs').select('*').ilike('title',`%${title}%`)
    .order('created_at',{ascending:false})

    if(error){
        console.log(error)
    }

    return (data as any) || []
}

export default getSongByTitle