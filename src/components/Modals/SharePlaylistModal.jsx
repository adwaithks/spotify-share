import React from 'react';

// modal
import Modal from 'react-modal';

// scss
import './SharePlaylistModal.scss';

// icons
import {IoCloseCircle} from 'react-icons/io5';
import {FiSend} from 'react-icons/fi';

// playlists, user context
import { playlistsContext } from '../../context/playlistsContext';
import { userContext } from '../../context/userContext';

// subcomponents
import PlaylistCard from '../PlaylistCard/PlaylistCard';
import Toast from '../Toast/Toast';

// utilities
import { postData } from '../../utils/postData';
import { URLS } from '../../utils/urls';


function SharePlaylistModal({isOpen, setIsOpen, shareTargetText}) {

  const [playlist, setPlaylist] = React.useState(shareTargetText);
  const [isGenPreview, setIsGenPreview] = React.useState(false);
  const [playlistMetadata, setPlaylistMetadata] = React.useState({
    title: "",
    description: "",
    sharedByDisplayName: "",
    imageUrl: ""
  });


  const {user, setUser} = React.useContext(userContext);
  const {setPlaylists} = React.useContext(playlistsContext);

  const isAlbumOrPlaylist = (playlistUrl) => {
    console.log(playlistUrl.split("/")[3].trim().toLowerCase());
    return ['playlist', 'album'].includes(playlistUrl.split("/")[3].trim().toLowerCase());
  }

  const processPlaylistUrl = (playlistUrl) => {
    let playlistUrlToArray = playlistUrl.split("?");
    return playlistUrlToArray[0].trim();
  }

  async function sharePlaylist() {
    let playlist_ = processPlaylistUrl(playlist);
    if (playlist_?.length == 0 && shareTargetText.length > 0) {
      playlist_ = shareTargetText;
    }
    if (!playlist_ || playlist_.length == 0) return;

    if (!isAlbumOrPlaylist(playlist_)) {
      window.alert('Currently you can share only albums or playlists.')
      return;
    }

    setIsGenPreview(true);

    let url = URLS.BASE_URL + '/api/playlist/previewshare';
    let postBody = {
      url: playlist_,
      sharedByDisplayName: user.name,
      sharedByEmail: user.email,
      userUrl: user.userUrl
    }
    
    let data = await postData(url, postBody);

    if (data.status != 200 && data.message == "PLAYLIST_ALREADY_SHARED") {
      setIsGenPreview(false);
      setIsOpen(false);
      setPlaylist("");
      window.alert("Playlist that you tried to share was already shared by someone else.")
      console.log('playlist already shared')
      return;
    }

    if (data.status != 200) {
      window.alert('token expired');
      setUser({
        token: "",
        email: "",
        isLoggedIn: false,
        userUrl: "",
        name: "",
        imageUrl: ""
      });
      window.localStorage.removeItem('user');
      window.location.href = "/"; 
      return;
    }

    setPlaylistMetadata({
      title: data.data.title,
      description: data.data.description,
      imageUrl: data.data.imageUrl,
      sharedByDisplayName: data.data.sharedByDisplayName
    });

    // 2secs to see the generated preview
    setTimeout(() => {
      setIsGenPreview(false);
      setPlaylist("");
      setPlaylists(prev => [...prev, data.data]);
      setIsOpen(false);
      if (window.history) {
        window.history.replaceState(null, "", "/");
      } else {
        window.location.href = "/";
      }
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
      <Toast />
      <div className='shareplaylistmodal__header'>
        <IoCloseCircle onClick={() => setIsOpen(false)} className='shareplaylistmodal__header__close' />
      </div>
      <textarea defaultValue={playlist || shareTargetText} onChange={playlistChangeHandler} placeholder='https://open.spotify.com/playlist...' className='shareplaylistmodal__input' name="" id="" cols="30" rows="10"></textarea>
      <button disabled={isGenPreview} onClick={sharePlaylist} className='shareplaylistmodal__share__btn'>
        <FiSend className='shareplaylistmodal__share__btn__icon' /> 
        {isGenPreview ? 'Sharing In Progress' : 'Share This Playlist'}
      </button>

      <div className='shareplaylistmodal__urlpreview'>
        {isGenPreview && <h5>generating image preview...</h5>}
        {playlistMetadata.imageUrl.length > 0 && 
        <PlaylistCard 
          width={'100%'}
          title={playlistMetadata.title}
          description={playlistMetadata.description}
          imageUrl={playlistMetadata.imageUrl}
          sharedByDisplayName={playlistMetadata.sharedByDisplayName}
        />}
      </div>
    </Modal>
  )
}

export default SharePlaylistModal;