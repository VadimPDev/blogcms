import React from 'react'
import {Link} from 'react-router-dom'
import Item from './item.png'
import './Header.css'

export const Header = () =>{
    return (
        <div className="header">
            <div className="header-title">
                <Link to='/'>Title</Link>
            </div>
            <div className="header-contacts">
                <div className="header-contacts__item">
                <Link to='/'><img src={Item} alt="item" /></Link>
                </div>
                <div className="header-contacts__item">
                <Link to='/'><img src={Item} alt="item" /></Link>
                </div>
                <div className="header-contacts__item">
                <Link to='/'><img src={Item} alt="item" /></Link>
                </div>
                <div className="header-contacts__item">
                <Link to='/'><img src={Item} alt="item" /></Link>
                </div>
            </div>
        </div>
    )
}