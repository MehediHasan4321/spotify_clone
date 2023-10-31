'use client'

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
import Model from "./Model"
import { useRouter } from "next/navigation"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import useAuthModel from "@/hooks/useAuthModel"
import { useEffect } from "react"

const AuthModle = ()=>{
    const supabaseClient = useSupabaseClient()
    const router = useRouter()
    const {session} = useSessionContext()
    const {onClose,isOpen} = useAuthModel()
    const onChange = (open:boolean)=>{
        if(!isOpen){
            onClose()
        }
    }

    useEffect(()=>{
        if(session){
            router.refresh()
            onClose()
        }
    },[session,onClose,router])


    return(
        <Model title="Test Titla" description="Test description" isOpen={isOpen} onClose={onClose} handleChange={onChange}>
            <Auth supabaseClient={supabaseClient} appearance={{
                theme:ThemeSupa,
                variables:{
                    default:{
                        colors:{
                            brand:'#404040',
                            brandAccent:'#22c55c'
                        }
                    }
                }
            }} theme="dark"
            providers={['github','google']}
            magicLink
            />
        </Model>
    )
}

export default AuthModle