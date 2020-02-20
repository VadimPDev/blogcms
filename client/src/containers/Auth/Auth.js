import React, { useState, useEffect, useContext } from 'react'
import {useHttp} from '../../hooks/HttpHook'
import {AuthContext} from '../../context/AuthContext'
import './Auth.css'

export const Auth = () =>{

    const [form,setForm] = useState({email:'',password:''})
    const auth = useContext(AuthContext)
    const {request} = useHttp()

    const loginHandler = async() =>{
        try{
            const data = await request('/api/auth/login','POST',{...form})
            auth.login(data.token,data.userId)
        }catch(e){

        }
    }
    const registerHandler = async() =>{
        try{
            const data = await request('/api/auth/register','POST',{...form})
            console.log(data)
        }catch(e){

        }
    }
    const submitHandler = (event) =>{
        event.preventDefault()
    }

    const changeHandler = (event) =>{
        setForm({...form,[event.target.name]:event.target.value})
    }
    useEffect(()=>{
        console.log(form)
    },[form])
    return (
        <div className='auth-form'>
            <form onSubmit={event=>submitHandler(event)}>
                <div className='input-group'>
                    <span>Email</span>
                    <input type='email' name='email' value={form.email} onChange={changeHandler}></input>
                </div>
                <div className='input-group'>
                    <span>Password</span>
                    <input type='password' name='password' value={form.password} onChange={changeHandler}></input>
                </div>
                <button className='login-button' onClick={loginHandler}>Login</button>
                <button className='register-button' onClick={registerHandler}>Register</button>
            </form>
        </div>
    )
}