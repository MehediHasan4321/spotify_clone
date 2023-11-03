import { Song } from "@/tpyes";
import { useSupabaseClient } from "@supabase/auth-helpers-react";


const useLoadImage = (song: Song) => {

    const supabaseclient = useSupabaseClient()


    if (!song) {
        return null
    }

    const { data: imageData } =  supabaseclient.storage.from('images').getPublicUrl(song.image_path)

   
    
    return imageData.publicUrl


}

export default useLoadImage