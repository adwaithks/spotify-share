import React from 'react';

import './TrackCard.scss';

function TrackCard({imageUrl, playlistUrl, title, description}) {

  const redirectToPlaylist = () => {
    window.open(playlistUrl, '_blank');
  }

  return (
    <div className='trackcard' onClick={redirectToPlaylist}>
        <div className='trackcard__image'>
            <img src={imageUrl} alt={title} />
        </div>
        <div className='trackcard__info'>
            <h1 className='trackcard__info__title'>{title}</h1>
            <h2 className='trackcard__info__desc'>{description}</h2>
        </div>
    </div>
  )
}

export default TrackCard