import React, { useEffect, useCallback, useState } from 'react'
import {useParams} from 'react-router-dom'
import { useHttp } from '../../hooks/HttpHook'
import parse from 'html-react-parser'
import { Loader } from '../../components/Loader/Loader'
import './DetailPage.css'

export const DetailPage = () =>{
    const newsId = useParams().id

    const {request,loading} = useHttp()

    const [news,setNews] = useState({})

    const getNews = useCallback(async()=>{
        const data = await request(`/api/news/get/${newsId}`,'GET')
        setNews(data)
    },[request,newsId])

    useEffect(()=>{
        getNews()
    },[getNews])

    if(loading) {
        return <Loader />
    }
    return (
    <div className='content'>
        <div className="news">
            <div className="news-title">{news.title}</div>
            <div className="news-info">
                <div className="news-img">
                    <img src={'http://localhost:5000/'+news.preview} alt="preview" width='350px' height='250px'/>
                </div>
                <div className="news-text">
                    {parse(`${news.text}`)}
                </div>
            </div>
            <div className="news-images">
                {console.log(news.images)}
            </div>
        </div>
    </div>
    )
}