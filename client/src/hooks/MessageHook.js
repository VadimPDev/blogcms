import {useCallback} from 'react'
import {useToasts} from 'react-toast-notifications'
export const useMessage = () =>{
    const {addToast} = useToasts()
    return useCallback(text =>{
        if(text){
            addToast(text,{appearance:'error',autoDismiss:true})
        }
    },[addToast])
}