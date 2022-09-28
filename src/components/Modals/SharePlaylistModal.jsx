import React from 'react';
import Modal from 'react-modal';
import './SharePlaylistModal.scss';
import {IoCloseCircle} from 'react-icons/io5';
import {FiSend} from 'react-icons/fi';
import { playlistsContext } from '../../context/playlistsContext';

function SharePlaylistModal({isOpen, setIsOpen}) {

  const [playlist, setPlaylist] = React.useState('');
  const {setPlaylists} = React.useContext(playlistsContext);

  async function sharePlaylist() {
    if (playlist.length < 10) return;
    const response = await fetch('http://localhost:5000/preview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: playlist
      })
    });

    let data = await response.json();
    console.log(data);
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