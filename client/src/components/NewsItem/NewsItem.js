import React from 'react'
import {Link} from 'react-router-dom'
import renderHtml from 'react-render-html'
import moment from 'moment'
import {url} from '../../config/config'

import './NewsItem.css'

export const NewsItem = ({item}) =>{
    return (
        <article className="news-list__item">
                    <div className="item-img">
                            <img src={url+item.preview} alt="item" width='330px' height='250px' />
                    </div>
                    <div className="item-info">
                            <div className="item-date">{moment(item.createdAt).format('MMMM Do YYYY')+ '/ Admin'}</div>
                            <div className="item-title">{item.title}.</div>
                            <div className="item-text">{renderHtml(item.text)}</div>
                            <div className="item-buttons">
                               <Link to={'/detail/'+item._id}>Продолжить читать</Link>
                            </div>
                    </div>
            </article>
    )
}