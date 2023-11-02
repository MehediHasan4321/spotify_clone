import { Song } from "@/tpyes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies,headers } from "next/headers";

const getSongByUserId = async():Promise<Song[]> =>{
    const supabase = createServerComponentClient({
        cookies:cookies,
        
    })

    const {data:sessionData,error:sessionError} = await supabase.auth.getSession()

    if(sessionError){
        console.log(sessionError)
    }
    

    const {data,error} = await supabase.from('songs').select('*').eq('user_id',sessionData?.session?.user.id).order('created_at',{ascending:false})

    if(error){
        console.log(error)
    }


    return (data as any) || []
}

export default getSongByUserId