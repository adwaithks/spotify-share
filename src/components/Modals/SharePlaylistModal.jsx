import React from 'react';

// modal
import Modal from 'react-modal';

// scss
import './SharePlaylistModal.scss';

// icons
import {IoCloseCircle} from 'react-icons/io5';
import {FiSend} from 'react-icons/fi';

// playlists context
import { playlistsContext } from '../../context/playlistsContext';

// utilities
import { postData } from '../../utils/postData';
import { URLS } from '../../utils/urls';

function SharePlaylistModal({isOpen, setIsOpen}) {

  const [playlist, setPlaylist] = React.useState('');
  const {setPlaylists} = React.useContext(playlistsContext);

  async function sharePlaylist() {
    if (playlist.length < 10) return;
    let url = URLS.BASE_URL + URLS.PREVIEW_URL;
    let postBody = {
      url: playlist
    }
    let data = await postData(url, postBody);
    setPlaylists(prev => [...prev, data]);
    setIsOpen(false);
  }

  function playlistChangeHandler(e) {
    setPlaylist(e.target.value);
  }

  return (
    <Modal
      className={isOpen ? 'shareplaylistmodal-open' : 'shareplaylistmodal-close'}
      onRequestClose={() => setIsOpen(false)}
      isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }
      }}
    >
      <div className='shareplaylistmodal__header'>
        <IoCloseCircle onClick={() => setIsOpen(false)} className='shareplaylistmodal__header__close' />
      </div>
      <textarea onChange={playlistChangeHandler} placeholder='https://open.spotify.com/playlist...' className='shareplaylistmodal__input' name="" id="" cols="30" rows="10"></textarea>
      <div className='shareplaylistmodal__urlpreview'></div>
      <button onClick={sharePlaylist} className='shareplaylistmodal__share__btn'><FiSend className='shareplaylistmodal__share__btn__icon' /> Share This Playlist</button>
    </Modal>
  )
}

export default SharePlaylistModal;