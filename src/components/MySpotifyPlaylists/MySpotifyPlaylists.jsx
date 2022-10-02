import React from 'react'
import PlaylistCard from '../PlaylistCard/PlaylistCard'

function MySpotifyPlaylists({playlists}) {

  return (
    <div>
        {
            !playlists && <h1 className='user__sharedlist__nothing'>You don't have any playlists. Why don't you start creating a playlist in Spotify :)</h1>
        }
        
        {
            playlists && playlists.map((playlist, idx) => {
                return (
                    <PlaylistCard
                        key={idx}
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
  )
}

export default MySpotifyPlaylists;