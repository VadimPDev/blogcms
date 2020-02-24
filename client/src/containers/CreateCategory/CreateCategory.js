import React, { useState,useContext } from 'react'
import { useHttp } from '../../hooks/HttpHook'
import {AuthContext} from '../../context/AuthContext'
import { useMessage } from '../../hooks/MessageHook'
import { useHistory } from 'react-router-dom'

export const CreateCategory = () =>{

    const [form,setForm] = useState({title:'',url:''})
    const {request} = useHttp()
    const {token} = useContext(AuthContext)
    const history = useHistory()
    const message = useMessage()

    const changeHandler = (event) =>{
        setForm({...form,[event.target.name]:event.target.value})
    }
    const submitHandler = (event) =>{
        event.preventDefault()

    }
    const createCategory = async() =>{
        try{
            const data = await request('/api/category/create','POST',{...form},{
                Authorization:`Bearer ${token}`
            })
            message('success',data.message)
            setTimeout(()=>{
                history.push('/')
            },4000)
        }catch(e){}
    }
    return (
        <div className='content'>
            <form className='add-form' onSubmit={event => submitHandler(event)}>
                <div className="input-add">
                    <span>Заголовок</span>
                    <input type='text' name='title' value={form.title} onChange={event => changeHandler(event)}/>
                </div>
                <div className="input-add">
                    <span>Url</span>
                    <input type='text' name='url' value={form.url} onChange={event => changeHandler(event)}/>
                </div>
             
                <div className="form-buttons" style={{paddingBottom:'200px'}}>
                    <button onClick={createCategory}>Create</button>
                </div>
            </form>
        </div>
    )
}