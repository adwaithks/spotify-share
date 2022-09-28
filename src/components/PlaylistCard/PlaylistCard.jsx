import React from 'react';

import './PlaylistCard.scss';

function PlaylistCard({imageUrl, playlistUrl, title, description}) {

  const redirectToPlaylist = () => {
    window.open(playlistUrl, '_blank');
  }

  return (
    <div className='playlistcard' onClick={redirectToPlaylist}>
        <div className='playlistcard__image'>
            <img src={imageUrl} alt={title} />
        </div>
        <div className='playlistcard__info'>
            <h1 className='playlistcard__info__title'>{title}</h1>
            <h2 className='playlistcard__info__desc'>{description}</h2>
        </div>
    </div>
  )
}

export default PlaylistCard