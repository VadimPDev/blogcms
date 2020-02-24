import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

export const Navbar = () =>{
    return (
        <nav>
            <div className="navbar-items">
                <div className="navbar-items__item">
                    <Link to='/'>Главная</Link>
                </div>
                <div className="navbar-items__item">
                    <a href="/">Page 1</a>
                </div>
                <div className="navbar-items__item">
                    <a href="/">Page 1</a>
                </div>
                <div className="navbar-items__item">
                    <a href="/">Page 1</a>
                </div>
                <div className="navbar-items__item">
                    <a href="/">Page 1</a>
                </div>
            </div>
        </nav>
    )
}