import { useState } from "react"

export const useFetch = () =>{
    const [fetchLoading, setFetchLoading] = useState(false)
    const [fetchError, setFetchError] = useState(null)

    const get = async(url) => {
        setFetchLoading(true)
        setFetchError(null)

        try{
            const response = await fetch(`
                ${import.meta.env.VITE_API_LINK}${url}
            `)

            const json = await response.json()

            if(response.ok){
                setFetchLoading(false)
                return json.message
            }

            if(!response.ok){
                console.log(json.message)
                setFetchError(json.message)
                setFetchLoading(false)
            }

        }catch(error){
            console.log(error.message)
            setFetchError(error.message)
            setFetchLoading(false)
        }
        
    }

    return {get, fetchLoading, fetchError}
}