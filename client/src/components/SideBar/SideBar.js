import React from 'react'
import {Link} from 'react-router-dom'
import './SideBar.css'


export const SideBar = () =>{
    return (
        <div className="sidebar">
            <div className="sidebar-title">Category</div>
            <ul className="category-items">
                <li className="category-items__item"><Link to='/'>Test category</Link></li>
                <li className="category-items__item"><Link to='/'>Test category</Link></li>
                <li className="category-items__item"><Link to='/'>Test category</Link></li>
                <li className="category-items__item"><Link to='/'>Test category</Link></li>
                <li className="category-items__item"><Link to='/'>Test category</Link></li>
            </ul>
        </div>
    )
}