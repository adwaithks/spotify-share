import React from 'react';
import { playlistsContext } from '../../context/playlistsContext';
import PlaylistCard from '../PlaylistCard/PlaylistCard';
import './SharedList.scss'

function SharedList() {

  const authUrl = 'https://accounts.spotify.com/authorize/';
  const redirectUrl = 'http://localhost:3000/';
  const clientId = '9bf4fbf0e6cb48b09c4f974becb9eaf9';
  const scopes = [
    'playlist-read-collaborative',
    'playlist-read-private'
  ];
  const loginUrl = `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`
  const {playlists} = React.useContext(playlistsContext);

  return (
    <div className='sharedlist'>
      {
        playlists.map((playlist, idx) => {
          return (
            <PlaylistCard 
            key={idx}
            playlistUrl={playlist.playlistUrl}
            imageUrl={playlist.imageUrl} 
            title={playlist.title}
            description={playlist.description}
            />
          )
        })
      }     
    </div>
  )
}

// c6ddf7bf0a7a49ea8c0bc30943d7e977 secret
//9bf4fbf0e6cb48b09c4f974becb9eaf9 clientid



export default SharedList