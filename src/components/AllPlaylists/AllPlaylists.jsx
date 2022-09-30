import React from 'react';

// playlists context
import { playlistsContext } from '../../context/playlistsContext';

// subcomponent
import PlaylistCard from '../PlaylistCard/PlaylistCard';

import {getAllPlaylists} from '../../utils/API/getAllPlaylists';

// scss
import './AllPlaylists.scss';

function AllPlaylists() {

  const [isLoading, setIsLoading] = React.useState(false);
  const {playlists, setPlaylists} = React.useContext(playlistsContext);

  async function getAllPlaylistsHelper() {
    let data = await getAllPlaylists();
    setIsLoading(false);
    setPlaylists(data.data);
  }

  React.useEffect(() => {
    setIsLoading(true);
    getAllPlaylistsHelper();
  }, []);

  return (
    <div className='sharedlist'>
      {
        isLoading && !playlists && <h1 className='sharedlist__loading'>Getting all playlists for you :)</h1>
      }

      {
        playlists.map((playlist, idx) => {
          return (
            <PlaylistCard 
              key={idx}
              width={'49%'}
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