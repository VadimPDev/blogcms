import {useCallback} from 'react'
import {useToasts} from 'react-toast-notifications'
export const useMessage = () =>{
    const {addToast} = useToasts()
    return useCallback((status,text) =>{
        if(text){
            addToast(text,{appearance:status,autoDismiss:true})
        }
    },[addToast])
}