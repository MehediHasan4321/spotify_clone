import {create } from 'zustand'

interface UploadModelSrops{
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void

}

const useUploadModel = create<UploadModelSrops>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))

export default useUploadModel