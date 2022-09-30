import React from 'react';
import Modal from 'react-modal';
import './AuthModal.scss';

import {IoCloseCircle} from 'react-icons/io5';
import {BsSpotify} from 'react-icons/bs';

import { getSpotifyAuthUrl } from '../../utils/getSpotifyAuthUrl';
import { authModalVisibilityContext } from '../../context/authModalVisibilityContext';

function AuthModal() {

    const {authModalIsOpen, setAuthModalIsOpen} = React.useContext(authModalVisibilityContext);

    function spotifyAuthHandler() {
        let url = getSpotifyAuthUrl();
        window.open(url, "_self");
    }

  return (
    <Modal
        className='authmodal'
        isOpen={authModalIsOpen}
        onRequestClose={() => setAuthModalIsOpen(false)}
        style={{
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            }
        }}
    >
        <div className='authmodal__header'>
            <IoCloseCircle onClick={() => setAuthModalIsOpen(false)} className='authmodal__header__close' />
        </div>
        <div className='authmodal__disclaimer'>
            <h2>Sign in to</h2>
            <h1>Spotify-Share</h1>
            <p>Sign in to share tracks and playlists directly from your spotify account. We won't post anything anywhere.</p>
        </div>
        <button onClick={spotifyAuthHandler} className='authmodal__auth__btn'>
            <BsSpotify className='authmodal__auth__btn__spotify' /> 
            Continue with Spotify
        </button>
    </Modal>
  )
}

export default AuthModal;