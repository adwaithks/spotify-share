import React from 'react';

// scss
import './Navbar.scss';

// link, navigate 
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// icons
import {HiViewGridAdd} from 'react-icons/hi';
import {FaUserCircle} from 'react-icons/fa';

// modal
import SharePlaylistModal from '../Modals/SharePlaylistModal';
import AuthModal from '../Modals/AuthModal';
import { userContext } from '../../context/userContext';

function Navbar() {

  const navigate = useNavigate();
  const [sharePlaylistModalisOpen, setSharePlaylistModalIsOpen] = React.useState(false);
  const [authModalIsOpen, setAuthModalIsOpen] = React.useState(false);
  const {user} = React.useContext(userContext);
  console.log('inside navbar', user);
  const sharePlaylistModalHandler = () => {
    setSharePlaylistModalIsOpen(true);
  }

  const authModalHandler = () => {
    setAuthModalIsOpen(true);
  }

  const navigateToUserPage = () => {
    navigate("/user");
  }

  return (
    <div className='navbar'>
        <nav className='navbar__links'>
            <Link className='navbar__links__link navbar__links__link-active' to="/">Home</Link>
            {user.isLoggedIn && <Link className='navbar__links__link' to="/favourites">Favourites</Link>}
            <button className='navbar__links__share' onClick={sharePlaylistModalHandler}><HiViewGridAdd className='navbar__links__share__icon' /> Share</button>
        </nav>

        <div className='navbar__avatar'>
          {user.imageUrl ? <img onClick={navigateToUserPage} className='navbar__avatar__userimg' src={user.imageUrl} alt="" /> : <FaUserCircle onClick={authModalHandler} className='navbar__avatar__user' />}
          <p>{user.name ? user.name : 'Sign In'}</p>
        </div>
        <AuthModal isOpen={authModalIsOpen} setIsOpen={setAuthModalIsOpen} />
        <SharePlaylistModal isOpen={sharePlaylistModalisOpen} setIsOpen={setSharePlaylistModalIsOpen} />
    </div>
  )
}

export default Navbar;

/*
        <div className='navbar__search'>
            <BsSearch className='navbar__search__icon' />
            <input type="input" placeholder='Search' />
        </div>
*/