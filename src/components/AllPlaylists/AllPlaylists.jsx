import React from 'react';

// playlists context
import { playlistsContext } from '../../context/playlistsContext';

// subcomponent
import PlaylistCard from '../PlaylistCard/PlaylistCard';

import {getAllPlaylists} from '../../utils/API/getAllPlaylists';

// scss
import './AllPlaylists.scss';

function AllPlaylists() {

  const {playlists, setPlaylists} = React.useContext(playlistsContext);

  async function getAllPlaylistsHelper() {
    let data = await getAllPlaylists();
    setPlaylists(data.data);
  }

  React.useEffect(() => {
    getAllPlaylistsHelper();
  }, []);

  return (
    <div className='sharedlist'>
      {
        playlists.length == 0 && <h1 className='sharedlist__nothing'>Nothing to show :(</h1>
      }

      {
        playlists.map((playlist, idx) => {
          return (
            <PlaylistCard 
              key={idx}
              width={'400px'}
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

export default AllPlaylists;