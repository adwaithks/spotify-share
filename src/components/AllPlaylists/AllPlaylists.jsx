import React from 'react';

// playlists context
import { playlistsContext } from '../../context/playlistsContext';

// subcomponent
import PlaylistCard from '../PlaylistCard/PlaylistCard';

// spinner
import { FallingLines } from 'react-loader-spinner';

// utilities
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
      isLoading && playlists.length == 0 && 
      <div className='loader'>
        <FallingLines
          className='loader__fallinglines'
          visible={true}
          color='gray'
          height='80px'
          width='80px'
        />
      </div>
      }

      {
        playlists.map((playlist, idx) => {
          return (
            <PlaylistCard 
              key={idx}
              width={'49%'}
              sharedByDisplayName={playlist.sharedByDisplayName}
              playlistUrl={playlist.playlistUrl}
              imageUrl={playlist.imageUrl} 
              sharedByUserUrl={playlist.sharedByUserUrl}
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