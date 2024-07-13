import React from 'react'
import './Nav.scss';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className='nav'>
            <ul className='nav__list'>
                <li className='nav__item nav__item--with-divider active'><Link to="/">Home</Link></li>
                <li className='nav__item nav__item--with-divider active'><Link to="/about">About</Link></li>
                <li className='nav__item nav__item--with-divider active'><Link to="/blog">Blog</Link></li>
                <li className='nav__item nav__item--with-divider'><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;