import React, { useEffect, useCallback, useState } from 'react'
import {useParams} from 'react-router-dom'
import { useHttp } from '../../hooks/HttpHook'
import parse from 'html-react-parser'


export const Page = () =>{

    const pageUrl = useParams().url

    const {request} = useHttp()
    const [page,setPage] = useState([])

    const loadPage = useCallback(async()=>{
        const data = await request(`/api/page/get/${pageUrl}`,'GET')
        console.log(data)
        setPage(data)
    },[request,pageUrl])

    useEffect(()=>{
        loadPage()
    },[loadPage])
    return (
        <div className='content'>
            {parse(`${page.content}`)}
        </div>
    )
}