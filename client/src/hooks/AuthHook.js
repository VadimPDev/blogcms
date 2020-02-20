import {useState,useCallback,useEffect} from 'react'
import jwt from  'jwt-decode'

const storageName= 'userData'

export const useAuth = () =>{
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken,id)=>{
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem(storageName,JSON.stringify({userId:id,token:jwtToken}))
    },[])

    const isTokenExpired = useCallback(() => {
        try {
            const data = JSON.parse(localStorage.getItem(storageName))
            if (data) {
                const { exp } = jwt(data.token);
                if (exp < (new Date().getTime() + 1) / 1000) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false
            }
        } catch (err) {

            return false;
        }
    },[])
    
    const logout = useCallback(()=>{
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    },[])


    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName))
        if(data && data.token) {
            const auth = isTokenExpired()
            if(!auth){
                logout()
            }
            login(data.token,data.userId)
        }
        setReady(true)
    },[login,isTokenExpired,logout])


    return {login,logout,token,userId,ready}
}