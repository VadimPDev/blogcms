import React, { useState, useContext, useEffect, useCallback } from 'react'
import {useHistory} from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react';
import {AuthContext} from '../../context/AuthContext'
import {useMessage} from '../../hooks/MessageHook'
import './AddNews.css'
import axios from 'axios'
import {useHttp} from '../../hooks/HttpHook'

export const AddNews = () =>{
    const history = useHistory()
    const message = useMessage()

    const [form,setForm] = useState({
        title:'',
        content:'',
        category:'',
        preview:null,
        images:null,
    })
    const [category,setCategory] = useState([])
    const {request} = useHttp()
    const {token} = useContext(AuthContext)

    const createNews = async() =>{
        try{
            const img = new FormData()
            Array.from(form.images).forEach((file,i)=>{
                img.append(i,file)
            })
            const preview = Array.from(form.preview)
            img.append('preview',preview[0])
            img.append('len',form.images.length)

            img.append('title',form.title)
            img.append('content',form.content)
            img.append('category',form.category)
        
            const data = await axios({
                method:"POST",
                url:'/api/news/add',
                headers:{
                    Authorization:`Bearer ${token}`
                },
                data:img
            })
            message(data.data.message)
            setTimeout(()=>{
                history.push('/')
            },3000)
        }catch(e){}
    }
    const changeHandler = (event) =>{
        setForm({...form,[event.target.name]:event.target.value})
    }
    const submitHandler = (event) =>{
        event.preventDefault()

    }
    const fileUpload = (event) =>{
        setForm({...form,[event.target.name]:event.target.files})
    }

    const loadCategory = useCallback(async() =>{
        try{
            const data = await request('/api/category/get','GET')
            setCategory(data)
        }catch(e){}
    },[request])

    

    useEffect(()=>{
        loadCategory()
    },[loadCategory])

    return (
        <div className='content'>
            <form className='add-form' onSubmit={event => submitHandler(event)}>
                <div className="input-add">
                    <span>Заголовок</span>
                    <input type='text' name='title' value={form.title} onChange={event => changeHandler(event)}/>
                </div>
                <div className="input-add">
                    <span>Категория</span>
                    <select name='category' onChange={event => changeHandler(event)}>
                        <option>Выберите категорию</option>
                        {category.map((cat,index)=>{
                            return <option name={cat.url} key={index}>{cat.title}</option>
                        })}
                    </select>
                </div>
                <div className="editor">
                    <Editor apiKey="66eiyabx1d4ze58ick0aqe6po9wgetbhpawmzjtwvz3mlbqs" value={form.content} onEditorChange={content => setForm({...form,content})}/>
                </div>
                <div className="input-add">
                    <span>Превью</span>
                    <input type='file' name='preview' onChange={event => fileUpload(event)}/>
                </div>
                <div className="input-add">
                    <span>Доп фото</span>
                    <input type='file' name='images' multiple onChange={event => fileUpload(event)}/>
                </div>
                <div className="form-buttons">
                    <button onClick={createNews}>Create</button>
                </div>
            </form>
        </div>
    )
}