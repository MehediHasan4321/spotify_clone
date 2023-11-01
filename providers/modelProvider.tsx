'use client'

import AuthModle from "@/components/authModle"
import UploadModel from "@/components/uploadModle"
import { useEffect, useState } from "react"

const ModelProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <AuthModle/>
            <UploadModel/>
        </>
    )
}

export default ModelProvider