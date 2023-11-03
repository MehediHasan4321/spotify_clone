'use client'

import useAuthModel from "@/hooks/useAuthModel"
import { useUser } from "@/hooks/useUser"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

interface LikeButtonProps {
    songId: string
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {

    const router = useRouter()
    const { supabaseClient } = useSessionContext();
    const authModel = useAuthModel()
    const { user } = useUser()
    const [isLiked, setIsliked] = useState(false)

    useEffect(()=>{
        if(!user?.id){
            return
        }
        const fetchData = async ()=>{
            const {data,error} =await supabaseClient.from('liked_songs').select('*').eq('user_id',user.id).eq('song_id',songId).single()

            if(!error && data){
                setIsliked(true)
            }else{
                setIsliked(false)
            }
        }

        fetchData()
        


    },[songId,supabaseClient,user?.id])

    const Icon = isLiked? AiFillHeart : AiOutlineHeart

    const handleLiked = async(id:string)=>{
        if(!user){
            return authModel.onOpen()
        }

        if(isLiked){
            
            const {error} = await  supabaseClient.from('liked_songs').delete()
            .eq('user_id',user.id)
            .eq('song_id',id)
            setIsliked(false)
            if(error){
                toast.error(error.message)
            }
          
        }else{
            const {error} = await supabaseClient.from('liked_songs')
            .insert({
                song_id:id,
                user_id:user.id
            })

            if(error){
                toast.error(`from insert ${error.message}`)
            }else{
                setIsliked(true)
                toast.success('Liked!')
            }
            
        }
        
       //router.refresh()
    }

    
    

    return (
        <button onClick={()=>handleLiked(songId)} className="cursor-pointer hover:opacity-75 transition">
            <Icon color={isLiked?'#22c553':'white'} size={26}/>
        </button>
    )
}

export default LikeButton