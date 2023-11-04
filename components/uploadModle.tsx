import useUploadModel from "@/hooks/useUploadModel"
import Model from "./Model"
import { useForm, FieldValues, SubmitHandler, } from "react-hook-form"
import {toast} from 'react-hot-toast'
import { useState } from "react"
import Input from "./input"
import Button from "./Button"
import { useUser } from "@/hooks/useUser"
import uniqid from 'uniqid'
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"

const UploadModel = () => {
    const { onClose, onOpen, isOpen } = useUploadModel()
    const [isLoading, setIsLoading] = useState(false)
    const {user} = useUser()
    const router = useRouter()
    const supabaseClient = useSupabaseClient()
    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    })

    const handleChange = (open: boolean) => {
        //TODO: reset form
        if (!open) {
            reset()
            onClose()
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        
        try {
            setIsLoading(true)
            const imageFile = values?.image?.[0]
            const songFile = values?.song?.[0]
            const uniqueID = uniqid()

            

            if(!imageFile || !songFile || !user){
                toast.error('Missing Error')
                return
            }

            //upload song

            const {data:songData,error:songError} =await supabaseClient.storage.from('songs').upload(`song-${values.title}-${uniqueID}`,songFile,{
                cacheControl:'3600',
                upsert:false
            })

            if(songError){
                setIsLoading(false)
                return toast.error('Failed to upload Song')
            }

            //Upload Image

            const {data:imageData,error:imageError} = await supabaseClient.storage.from('images').upload(`images-${values.title}-${uniqueID}`,imageFile,{
                cacheControl:'3600',
                upsert:false,
                
            })

            if(imageError){
                setIsLoading(false)
                return toast.error('Falied To Upload Image')
            }

            const {error:supabaseError} = await supabaseClient.from('songs').insert({
                user_id:user.id,
                title:values.title,
                author:values.author,
                image_path:imageData.path,
                song_path:songData.path
            })

            if(supabaseError){
                setIsLoading(false)
                toast.error(supabaseError.message)
            }

            router.refresh()
            toast.success('Song Created!')
            reset()
            onClose()
        } catch (error) {
            toast.error('Something went wrong')
        }finally{
            setIsLoading(false)
        }
    }


    return (
        <Model title="Add A Song"
            description="Upload an mp3 file"
            isOpen={isOpen}
            handleChange={handleChange}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder='Song Title'
                    className="px-2"
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register('author', { required: true })}
                    placeholder='Enter Song Author Name'
                    className="px-2"
                />
                <div>
                    <div className="pb-1">
                        Select a Song File
                    </div>
                </div>
                <Input
                    id="song"
                    type="file"
                    disabled={isLoading}
                    accept=".mp3"
                    {...register('song', { required: true })}

                />
                <div>
                    <div className="pb-1">
                        Select an Image
                    </div>
                </div>
                <Input
                    id="image"
                    type="file"
                    disabled={isLoading}
                    accept="image/*"
                    {...register('image', { required: true })}

                />
                <Button disabled={isLoading} type="submit">{isLoading?'Creating....':'Create'}</Button>
            </form>

        </Model>
    )
}

export default UploadModel