import React from 'react'
import PlaylistCard from '../../components/PlaylistCard/PlaylistCard';
import { userContext } from '../../context/userContext'
import { getUserPlaylists } from '../../utils/spotifyAPI/getUserPlaylists';
import './User.scss';


function User() {

    const {user} = React.useContext(userContext);
    const [data, setData] = React.useState([]);

    const getUserPlaylistsHelper = async () => {
        let data = await getUserPlaylists(user.token);
        console.log(data);
        setData(data.items);
    }

    React.useEffect(() => {
        getUserPlaylistsHelper();
    }, []);

  return (
    <div className='user'>
        <div className='user__header'>
            <h1>Playlists</h1>
        </div>
        <div className='user__sharedlist'>
        {
            data.length > 0 && data.map((playlist, idx) => {
                return (
                    <PlaylistCard
                        key={idx}
                        isPublic={playlist.public}
                        isShareable={playlist.public}
                        width={'100%'}
                        playlistUrl={playlist.external_urls.spotify}
                        imageUrl={playlist.images[0].url} 
                        title={playlist.name}
                        playlistDescription={playlist?.description}
                        description={`${playlist.owner.display_name} . Playlist . ${playlist.tracks.total}`}
                    />
                )                            
            })
        }
        </div>
    </div>
  )
}

export default User