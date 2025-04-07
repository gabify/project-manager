import { useState } from "react";


export const usePost = () =>{
    const [postLoading, setPostLoading] = useState(false)
    const [postError, setPostError] = useState(null)

    const send = async(data, url) =>{
        setPostLoading(true)
        setPostError(null)
        try{
            const response = await fetch(`${import.meta.env.VITE_API_LINK}${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(data)
            })
    
            const json = await response.json()
            if(!response.ok){
                console.log(json.error)
                setPostError(json.error)
                setPostLoading(false)
            }
    
            if(response.ok){
                setPostLoading(false)
                return json
            }
        }catch(err){
            setPostError(err.message)
            setPostLoading(false)
        }
    }

    return {send, postLoading, postError}
}