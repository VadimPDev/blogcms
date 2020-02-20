import React, {useState, useEffect, useCallback} from 'react'
import { NewsList } from '../../components/NewsList/NewsList'
import {useHttp} from '../../hooks/HttpHook'
import {Loader} from '../../components/Loader/Loader'
import './Main.css'

export const Main = () =>{
    const [news, setNews] = useState([])
    const {request,loading} = useHttp()

    const loadNews = useCallback(async()=>{
        try{
            const data = await request('/api/news/load','GET')
            setNews(data)
        }catch(e){}
    },[request])
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