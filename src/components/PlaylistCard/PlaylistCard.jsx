import React from 'react';

// scss
import './PlaylistCard.scss';

// icons
import {SiApplemusic} from 'react-icons/si';
import {BsFillLockFill} from 'react-icons/bs';
import { playlistsContext } from '../../context/playlistsContext';

function PlaylistCard({imageUrl, playlistUrl, title, description, width, playlistDescription = "", isPublic = true, isShareable = false}) {

  const {setPlaylists} = React.useContext(playlistsContext);

  // onclick goto playlist
  const redirectToPlaylist = () => {
    window.open(playlistUrl, '_blank');
  }

  const sharePlaylistHandler = () => {
    setPlaylists(prev => [...prev, {
      title: title,
      description: description,
      playlistUrl: playlistUrl,
      imageUrl: imageUrl
    }]);
  }

  return (
    <div style={{width: width ? width : '45%'}} className='playlistcard' onClick={redirectToPlaylist}>
        <div className='playlistcard__image'>
            {
              imageUrl.length > 0 ? 
              <img src={imageUrl} alt={title} /> :
              <SiApplemusic className='playlistcard__image__fallback' />
            }
            
        </div>
        <div className='playlistcard__info'>
            <h1 className='playlistcard__info__title'>{title} {!isPublic ? <BsFillLockFill className='playlistcard__info__lock' /> : null }</h1>
            <h2 className='playlistcard__info__desc'>{description}</h2>
            <h2 className='playlistcard__info__playlistdesc'>{playlistDescription}</h2>
            {!isPublic && <p className='playlistcard__info__disclaimer'>This playlist is not public or a playlist that you don't own.</p> }
            {isShareable && <button onClick={sharePlaylistHandler} className='playlistcard__info__share__btn'>Share</button>}
        </div>
    </div>
  )
}

export default PlaylistCard