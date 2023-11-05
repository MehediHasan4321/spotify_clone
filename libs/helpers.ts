import { Price } from "@/tpyes";

export const getUrl = () => {
    let url = process.env.NEXT_PUBLIC_SITE_URL ??
        process.env.NEXT_PUBLIC_VERCEL_URL ??
        'http://localhost:3000'

    url = url.includes('http') ? url : `https//${url}`
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`

    return url
}


export const postData = async({url,data}:{url:string,data:Price})=>{    
    console.log('POST REQUEST',url,data)

    const res :Response = await fetch(url,{
        method:'POST',
        headers:new Headers ({'Content-Type':'application/json'}),
        credentials:'same-origin',
        body:JSON.stringify(data)
    })

    if(!res.ok){
        console.log('Error in Post ',{url,data})
        throw new Error(res.statusText)
    }
}


export const  toDateTime = (sec:number)=>{
    var t = new Date('1970-01-01T00:30:00Z')
    t.setSeconds(sec)
    return t
}