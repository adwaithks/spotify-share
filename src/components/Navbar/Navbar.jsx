import React from 'react';

// scss
import './Navbar.scss';

// Link 
import {Link} from 'react-router-dom';

// icons
import {BsSearch} from 'react-icons/bs';
import {HiViewGridAdd} from 'react-icons/hi';

// modal
import SharePlaylistModal from '../Modals/SharePlaylistModal';

function Navbar() {

  const [isOpen, setIsOpen] = React.useState(false);

  const sharePlaylistModalHandler = () => {
    setIsOpen(true);
  }

  return (
    <div className='navbar'>
        <nav className='navbar__links'>
            <Link className='navbar__links__link navbar__links__link-active' to="/">home</Link>
            <Link className='navbar__links__link' to="/favourites">favourites</Link>
            <button className='navbar__links__share' onClick={sharePlaylistModalHandler}><HiViewGridAdd className='navbar__links__share__icon' /> Share</button>
        </nav>
        <div className='navbar__search'>
            <BsSearch className='navbar__search__icon' />
            <input type="input" placeholder='Search' />
        </div>
        <SharePlaylistModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default Navbar