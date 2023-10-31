import {create } from 'zustand'

interface AuthModelSrops{
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void

}

const useAuthModel = create<AuthModelSrops>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))

export default useAuthModel