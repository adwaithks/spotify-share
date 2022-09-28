import React from 'react';

// scss
import './PlaylistCard.scss';

// icons
import {SiApplemusic} from 'react-icons/si';

function PlaylistCard({imageUrl, playlistUrl, title, description, width}) {

  // onclick goto playlist
  const redirectToPlaylist = () => {
    window.open(playlistUrl, '_blank');
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
            <h1 className='playlistcard__info__title'>{title}</h1>
            <h2 className='playlistcard__info__desc'>{description}</h2>
        </div>
    </div>
  )
}

export default PlaylistCard