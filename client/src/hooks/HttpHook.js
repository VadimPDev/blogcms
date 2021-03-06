import {useState, useCallback} from 'react'
export const useHttp = () =>{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = useCallback(async (url,method= 'GET',body= null, headers = {},options={}) =>{
        setLoading(true)
        try {
            if(options.headers !== 'auto'){
                if(body){
                    body = JSON.stringify(body)
                    headers['Content-Type'] = headers['Content-Type'] ? headers['Content-Type'] : 'application/json'
                    
                }
            } 
            const response = await fetch(url,{method,body,headers})
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message ||data.errors[0].msg || 'Что то пошло не так')
            }
            setLoading(false)

            return data
        }catch(e){
            setLoading(false)
            setError(e.message)
            throw e
        }
    },[])

    const clearError = useCallback(() => setError(null),[])

    return { loading,request,error,clearError}
}