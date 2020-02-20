import React, { useEffect, useState, useCallback } from 'react'
import {Link} from 'react-router-dom'
import './SideBar.css'
import { useHttp } from '../../hooks/HttpHook'
import { Loader } from '../Loader/Loader'


export const SideBar = ({auth}) =>{
    const  {request,loading} = useHttp()
    const [category,setCategory] = useState([])
    const loadCategory = useCallback(async()=>{
        const data = await request('/api/category/get','GET')
        setCategory(data)
    },[request])
    useEffect(()=>{
        loadCategory()
    },[loadCategory])
    if(loading) {
        return <Loader />
    }
    if(auth) {
        return (
            <div className="sidebar">
                <div className="sidebar-title">Admin</div>
            <ul className="category-items">
                <li className="category-items__item"><Link to='/admin/add'>Создать новость</Link></li>
                <li className="category-items__item"><Link to='/admin/category'>Создать категорию</Link></li>
                <li className="category-items__item"><Link to='/admin/news'>Все новости</Link></li>
            </ul>
            <div className="sidebar-title">Category</div>
            <ul className="category-items">
                {category.map((cat,index) =>{
                    return <li className="category-items__item" key={index}><Link to={'/category/'+cat.url}>{cat.title}</Link></li>
                })}
            </ul>
        </div>
        )
    }
    return (
        <div className="sidebar">
            <div className="sidebar-title">Category</div>
            <ul className="category-items">
                {category.map((cat,index) =>{
                    return <li className="category-items__item" key={index}><Link to={'/category/'+cat.url}>{cat.title}</Link></li>
                })}
            </ul>
        </div>
    )
}