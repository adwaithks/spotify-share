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
import PlaylistCard from '../PlaylistCard/PlaylistCard';

function SharePlaylistModal({isOpen, setIsOpen}) {

  const [isGenPreview, setIsGenPreview] = React.useState(false);
  const [playlistMetadata, setPlaylistMetadata] = React.useState({
    title: "",
    description: "",
    imageUrl: ""
  });
  const [playlist, setPlaylist] = React.useState('');
  const {setPlaylists} = React.useContext(playlistsContext);

  async function sharePlaylist() {
    if (playlist.length < 10) return;
    setIsGenPreview(true);
    let url = URLS.BASE_URL + URLS.PREVIEW_URL;
    let postBody = {
      url: playlist
    }
    let data = await postData(url, postBody);
    setPlaylistMetadata({
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl
    });
    setIsGenPreview(false);
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
      <button disabled={isGenPreview} onClick={sharePlaylist} className='shareplaylistmodal__share__btn'>
        <FiSend className='shareplaylistmodal__share__btn__icon' /> 
        Share This Playlist
      </button>

      <div className='shareplaylistmodal__urlpreview'>
        {isGenPreview && <h5>generating image preview...</h5>}
        {playlistMetadata.imageUrl.length > 0 && 
        <PlaylistCard 
          width={'100%'}
          title={playlistMetadata.title}
          description={playlistMetadata.description}
          imageUrl={playlistMetadata.imageUrl}
        />}
      </div>
    </Modal>
  )
}

export default SharePlaylistModal;