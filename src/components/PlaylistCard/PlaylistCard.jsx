import React from 'react';

// scss
import './PlaylistCard.scss';

// icons
import {SiApplemusic} from 'react-icons/si';
import { playlistsContext } from '../../context/playlistsContext';

function PlaylistCard({
  imageUrl, 
  playlistUrl, 
  title, 
  description, 
  width, 
  playlistDescription = "", 
  isShareable = false,
  sharedByDisplayName,
  sharedByUserUrl
}) {

  /*
  Eg:
  description -> Adwaith KS . Playlist . 18 Songs
  playlistDescription -> My playlist description
  */

  const {setPlaylists} = React.useContext(playlistsContext);

  // onclick goto playlist
  const redirectToPlaylist = () => {
    window.open(playlistUrl, '_blank');
  }

  // share users playlist directly by clicking share btn
  const sharePlaylistHandler = () => {
    setPlaylists(prev => [...prev, {
      title: title,
      description: description,
      playlistUrl: playlistUrl,
      imageUrl: imageUrl
    }]);
  }

  return (
    <div style={{width: width ? width : '45%'}} className='playlistcard'>
        <div className='playlistcard__image'>
            {
              imageUrl.length > 0 ? 
              <img onClick={redirectToPlaylist} src={imageUrl} alt={title} /> :
              <SiApplemusic onClick={redirectToPlaylist} className='playlistcard__image__fallback' />
            }
        </div>

        <div className='playlistcard__info'>
            <h1 onClick={redirectToPlaylist} className='playlistcard__info__title'>{title}</h1>
            <h2 className='playlistcard__info__desc'>{description}</h2>
            <h2 className='playlistcard__info__playlistdesc'>{playlistDescription}</h2>
            {isShareable && <button onClick={sharePlaylistHandler} className='playlistcard__info__share__btn'>Share</button>}
            <span className='shared__by__label' onClick={() => window.open(`${sharedByUserUrl}`)}>Shared By {sharedByDisplayName}</span>
        </div>
    </div>
  )
}

export default PlaylistCard