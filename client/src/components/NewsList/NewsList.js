import React from 'react'
import { NewsItem } from '../NewsItem/NewsItem'

export const NewsList = ({news}) =>{
    return (
        <>
            {news.map((item,index)=>{
                return <NewsItem item={item} key={index}/>
            })}
        </>
    )
}