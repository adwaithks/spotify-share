import React from 'react'
import './Navbar.scss'
import {Link} from 'react-router-dom';
import {BsSearch} from 'react-icons/bs';

function Navbar() {
  return (
    <div className='navbar'>
        <nav className='navbar__links'>
            <Link className='navbar__links__link navbar__links__link-active' to="/">home</Link>
            <Link className='navbar__links__link' to="/favourites">favourites</Link>
        </nav>
        <div className='navbar__search'>
            <BsSearch className='navbar__search__icon' />
            <input type="input" placeholder='Search' />
        </div>
    </div>
  )
}

export default Navbar