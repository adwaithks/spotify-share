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
import { userContext } from '../../context/userContext';

function SharePlaylistModal({isOpen, setIsOpen, shareTargetText}) {

  const [playlist, setPlaylist] = React.useState(shareTargetText);
  const [isGenPreview, setIsGenPreview] = React.useState(false);
  const [playlistMetadata, setPlaylistMetadata] = React.useState({
    title: "",
    description: "",
    imageUrl: ""
  });


  const {setUser} = React.useContext(userContext);
  const {setPlaylists} = React.useContext(playlistsContext);


  async function sharePlaylist() {
    let playlist_ = playlist;
    if (playlist_.length == 0 && shareTargetText.length > 0) {
      playlist_ = shareTargetText;
    }
    if (!playlist_) return;

    setIsGenPreview(true);

    let url = URLS.BASE_URL + '/api/playlist/previewshare';
    let postBody = {
      url: playlist_
    }
    
    let data = await postData(url, postBody);


    if (data.status != 200 && data.error.type == "PLAYLIST_ALREADY_SHARED") {
      setIsGenPreview(false);
      setIsOpen(false);
      setPlaylist("");
      alert("Playlist that you tried to share was already shared in ShareList.")
      return;
    }
    if (data.status != 200) {
      console.log('user token expired');
      setUser({
        token: "",
        isLoggedIn: false,
        name: "",
        imageUrl: ""
      });
      window.localStorage.removeItem('user');
      return;
    }

    setPlaylistMetadata({
      title: data.data.title,
      description: data.data.description,
      imageUrl: data.data.imageUrl
    });

    // 2secs to see the generated preview
    setTimeout(() => {
      setIsGenPreview(false);
      setPlaylist("");
      setPlaylists(prev => [...prev, data.data]);
      setIsOpen(false);
    }, 2000);
  }

  function playlistChangeHandler(e) {
    setPlaylist(e.target.value);
  }

  return (
    <Modal
      className='shareplaylistmodal'
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
      <textarea defaultValue={playlist || shareTargetText} onChange={playlistChangeHandler} placeholder='https://open.spotify.com/playlist...' className='shareplaylistmodal__input' name="" id="" cols="30" rows="10"></textarea>
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