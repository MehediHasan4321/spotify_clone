import { Song } from "@/tpyes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies,headers } from "next/headers";

const getLidedSongs = async():Promise<Song[]> =>{
    const supabase = createServerComponentClient({
        cookies:cookies,
        
    })

    const {data:{session}} = await supabase.auth.getSession()

    const {data,error} = await supabase.from('liked_songs').select('*,songs(*)').eq('user_id',session?.user?.id).order('created_at',{ascending:false})

    if(error){
        console.log(error)
        return []
    }

    return data.map(item=>({
        ...item.songs
    }))
}

export default getLidedSongs