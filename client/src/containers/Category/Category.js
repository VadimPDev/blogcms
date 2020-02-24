import React,{useState,useCallback,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {NewsList} from '../../components/NewsList/NewsList'
import { useHttp } from '../../hooks/HttpHook'
import {Loader} from '../../components/Loader/Loader'

export const Category = () =>{
    const categoryURL = useParams().url
    const [news, setNews] = useState([])

    const {request,loading} = useHttp()

    const loadNews = useCallback(async()=>{
        try{
            const data = await request(`/api/news/category/${categoryURL}`,'GET')
            setNews(data)
        }catch(e){}
    },[request,categoryURL])

    useEffect(()=>{
        loadNews()
    },[loadNews])
    
    if(loading){
        return <Loader />
    }

    return (
        <div className="content">
            <div className="news-list">
                <NewsList news={news}/>
            </div>
        </div>
    )
}