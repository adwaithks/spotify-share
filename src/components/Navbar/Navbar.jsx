import React from 'react';

// scss
import './Navbar.scss';

// link, navigate 
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

// icons
import {HiViewGridAdd} from 'react-icons/hi';
import {FaUserCircle} from 'react-icons/fa';

// modal
import SharePlaylistModal from '../Modals/SharePlaylistModal';
import AuthModal from '../Modals/AuthModal';

// usercontext
import { userContext } from '../../context/userContext';
import { authModalVisibilityContext } from '../../context/authModalVisibilityContext';

function Navbar() {

  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = React.useState('HOME');
  const [shareTargetText, setShareTargetText] = React.useState('');
  const [sharePlaylistModalisOpen, setSharePlaylistModalIsOpen] = React.useState(false);
  
  const {setAuthModalIsOpen} = React.useContext(authModalVisibilityContext);
  const {user} = React.useContext(userContext);

  const sharePlaylistModalHandler = () => {
    if (!user.isLoggedIn) {
      setAuthModalIsOpen(true);
      return;
    }
    setSharePlaylistModalIsOpen(true);
  }

  React.useEffect(() => {
    console.log(currentTab);
    let tab = window.location.href.split("/")[3].toUpperCase();
    if (tab === "")
      setCurrentTab('HOME');
    else if (tab === "favourites")
      setCurrentTab(tab);
    
    let isShareTargetText = decodeURIComponent(window.location.search)?.substring(1)?.split("&")[0];
    if (isShareTargetText.substring(0, 4) == "text") {
      setShareTargetText(isShareTargetText.substring(5));
      setSharePlaylistModalIsOpen(true);
    }
  }, [window.location.href]);

  const navigateToUserPage = () => {
    navigate("/user");
  }

  return (
    <div className='navbar'>
        <nav className='navbar__links'>
            <Link className={currentTab === 'HOME' ? 'navbar__links__link-active' : 'navbar__links__link'} to="/">Home</Link>
            {user.isLoggedIn && <Link className={currentTab === 'FAVOURITES' ? 'navbar__links__link-active' : 'navbar__links__link'} to="/favourites">Favourites</Link>}
            <button className='navbar__links__share' onClick={sharePlaylistModalHandler}><HiViewGridAdd className='navbar__links__share__icon' /> Share</button>
        </nav>

        <div className='navbar__avatar'>
          {user.imageUrl ? <img onClick={navigateToUserPage} className='navbar__avatar__userimg' src={user.imageUrl} alt="" /> : <FaUserCircle onClick={() => setAuthModalIsOpen(true)} className='navbar__avatar__user' />}
          <p>{user.name ? user.name : 'Sign In'}</p>
        </div>
        <AuthModal />
        <SharePlaylistModal isOpen={sharePlaylistModalisOpen} setIsOpen={setSharePlaylistModalIsOpen} shareTargetText={shareTargetText} />
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