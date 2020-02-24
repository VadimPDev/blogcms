import React, { useState, useEffect, useContext } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useMessage } from '../../hooks/MessageHook';
import { useHttp } from '../../hooks/HttpHook';
import { AuthContext } from '../../context/AuthContext';
/*import 'tinymce/plugins/preview'
import 'tinymce/plugins/imageprint'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/visualblocks'*/

export const CreatePage = () =>{
    const [form,setForm] = useState({
        title:'',
        url:'',
        content:''
    })
    const message = useMessage()
    const {request,error,clearError} = useHttp()
    const {token} = useContext(AuthContext)

    const changeHandler = event =>{
        setForm({...form,[event.target.name]:event.target.value})
    }

    const submitHandler =event =>{
        event.preventDefault()
    }

    const createPage = async() =>{
        try{
            const data = await request('/api/page/create','POST',{...form},{
                Authorization:`Bearer ${token}`
            })
            message('success',data.message)
        }catch(e){}
    }

    useEffect(()=>{
        message('error',error)
        clearError()
    },[message,error,clearError])
    return (
        <div className="content">
            <form className='add-form' onSubmit={event => submitHandler(event)}>
                <div className="input-add">
                    <span>Заголовок</span>
                    <input type='text' name='title' value={form.title} onChange={event => changeHandler(event)}/>
                </div>
                <div className="input-add">
                    <span>Url</span>
                    <input type='text' name='url' value={form.url} onChange={event => changeHandler(event)}/>
                </div>
                <div className="editor">
                    <Editor apiKey="66eiyabx1d4ze58ick0aqe6po9wgetbhpawmzjtwvz3mlbqs" init={{
                        height:500,
                        plugins:[
                            'image lists link preview',
                            'visualblocks media table paste code',
                            'insertdatetime help wordcount advlist autolink'
                          ],
                          toolbar:
                          'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'  
                    }} value={form.content} onEditorChange={content => setForm({...form,content})}/>
                </div>
             
                <div className="form-buttons" style={{paddingBottom:'200px'}}>
                    <button onClick={createPage}>Create</button>
                </div>
            </form>
        </div>
    )
}