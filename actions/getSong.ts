import { Song } from "@/tpyes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies,headers } from "next/headers";

const getSong = async():Promise<Song[]> =>{
    const supabase = createServerComponentClient({
        cookies:cookies,
        
    })

    const {data,error} = await supabase.from('songs').select('*').order('created_at',{ascending:false})

    if(error){
        console.log(error)
    }

    return (data as any) || []
}

export default getSong